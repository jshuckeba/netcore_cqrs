## Introduction
This repository contains the source code for my 2018 Orlando Code Camp presentation on CQRS and Event Sourcing with .NET Core, CQRSLite and Elasticsearch. The intent of the project is to educate developers on the CQRS and Event Sourcing patterns and to serve as a streamline to bootstrap new projects. This project also uses the new SignalR for .NET Core implementation to push events to the browser.

Slides from the presentation can be found [here](/CQRS_Presentation.pdf)

## Get Started
1. The Elasticsearch Dockerfile can be found at (https://hub.docker.com/r/sebp/elk/)
2. You will likely need to perform [this heap-size modification](https://www.elastic.co/guide/en/elasticsearch/reference/master/heap-size.html) on the docker file.

## Resources
*[CQRSLite](https://github.com/gautema/cqrslite)
*[ElasticSearch](https://www.elastic.co)
*[Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)
*[CQRS](https://martinfowler.com/bliki/CQRS.html)
*[MSDN CQRS Journey](https://msdn.microsoft.com/en-us/library/jj554200.aspx)
*[Domain Driven Design Book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215/ref=sr_1_1?ie=UTF8&qid=1521161842&sr=8-1&keywords=domain+driven+design)