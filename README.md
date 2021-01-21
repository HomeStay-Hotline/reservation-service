# HomeStay-Hotline

Welcome to HomeStay-Hotline! HomeStay-Hotline is an accomadation booking service using service oriented architecture(SOA), and this project is specifically for the calendar module in the application. This project is based on a legacy code base, which had a fully working front end with a minimum of back end. Initially, the database of the legacy codebase stored the calendar dates for each listing, so the front end was refactored so that a static calendar was rendered intsead cutting down the size of the database by 200%. 
## Related Projects

  - [HomeStay-Hotline Photos Module](https://github.com/HomeStay-Hotline/photos-service)
  - [HomeStay-Hotline Info Module](https://github.com/HomeStay-Hotline/info-service)
  - [HomeStay-Hotline Carousel Module](https://github.com/HomeStay-Hotline/carousel) 
  - [HomeStay-Hotline Reviews Module](https://github.com/HomeStay-Hotline/reviews-service)

## Table of Contents

1. [Database](#database)
1. [Server Optimization and Scaling the Architecture](#server-optimization-and-scaling-the-architecture)
1. [Result](#result)

## Database
In deciding which database to use for my module, between a SQL database, PostgreSQL and a noSQL database, ArangoDB, I chose to use PostgreSQL for this project. In my initial benchmark tests for both databases, PostgreSQL on average had a query time, post table indexing, of around 5 ms non-cached, whereas ArangoDB had a query time of around 6 ms with occasional spikes of 30 ms per query non-cached. With trying to simulate traffic seen in Black Friday, spikes of 30 ms per query would build up drastically fast. 

As can be seen on the Table 1 above, the query time of PostgreSQL was faster than the query time of Cassandra for cached and non-cached data. Also, because of Postgres’s strong developer community, PostgreSQL was a better fit for my specific use case.

## Server Optimization and Scaling the Architecture

![Server Architecture](https://github.com/The-10-000-RPS-Club/relatedItems-chris/blob/master/Server_Architecture.png)

After deploying my application to Amazon Web Service (AWS) Elastic Compute Cloud (EC2), I had one NGINX as a load balancer to distribute incoming requests, one service server instance, and one database instance. Then, I used a stress testing tool called loader.io to test my application. I could get 400 requests per second (RPS) without having an error rate of over 1% and a latency per request of under 50ms. I horizontally scaled my application by taking a snapshot image of the service server, dockerizing the server, and uploading the docker image onto an AWS EC2 instance for the service server. With two service server instances, I could get 800 RPS. By seeing this increase, I added third and fourth instances, expecting to get at least 1200 RPS. However, it did not go over 1000 RPS. So knowing I had hit a bottleneck I had to look elsewhere in my architecture to increase the requests my application could take. After noticing that the file limit had been reached on my NGINX load balancer, I reconfigured the conf files to up the file limit and worker connections allowed. After this change, the application could handle 1200 RPS while still have under 1 second latency per request. Trying to add another server afterwards did not result in the increase I expected it too. With the load balancer and service being out of the equation, the database was the final spot for a possible bottleneck. As expected, vertically scaling the database from a t2.micro to a t2.large increased my RPS to 2000 with the 4th service. This vertically scaling would eventually be replaced with the streaming replication that PostgreSQL offers as seen in the diagram.

## Result
After benchmarking databases and optimizing the application’s architecture, I could get a 300% increase in throughput. This means more concurrent users can interact with the application without being angry because of wait time, and more happy users will result in an increase in a company’s revenue. Overall, I was happy that I could overcome the challenge and meet the goal.
