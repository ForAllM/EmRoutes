# Emergency Vehicle Alert System - Software Requirements Specification

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
2. [System Overview](#2-system-overview)
3. [Functional Requirements](#3-functional-requirements)
   - 3.1 [API Endpoints](#31-api-endpoints)
   - 3.2 [Location Tracking & Proximity Calculation](#32-location-tracking--proximity-calculation)
   - 3.3 [Real-time Alerts](#33-real-time-alerts)
4. [Non-Functional Requirements](#4-non-functional-requirements)
   - 4.1 [Performance Requirements](#41-performance-requirements)
   - 4.2 [Scalability](#42-scalability)
   - 4.3 [Security](#43-security)
5. [Database Model](#5-database-model)
6. [Tech Stack](#6-tech-stack)
7. [System Architecture](#7-system-architecture)
8. [Project Roadmap and Checklist](#8-project-roadmap-and-checklist)

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document outlines the functional and non-functional requirements for the Emergency Vehicle Alert System. The system is designed to notify regular vehicles of an approaching emergency vehicle (EV) in real time, ensuring they can clear the pathway. The system will utilize a combination of GPS tracking, WebSockets, geospatial queries, and proximity-based alerts to facilitate seamless communication between EVs and regular vehicles.

### 1.2 Scope
The project will include the development of:
- **Mobile App**: A React Native-based application for regular vehicles to receive real-time alerts and for emergency vehicles to send location updates.
- **Backend Server**: A Node.js and Express-based backend to handle API requests, real-time communication, and geospatial calculations.
- **Database**: PostgreSQL with PostGIS to store vehicle data, location updates, emergency statuses, and alerts.
- **Mapping Service**: Integration of an open-source mapping service (e.g., OpenStreetMap) for route planning and traffic updates.

### 1.3 Definitions, Acronyms, and Abbreviations
- **EV**: Emergency Vehicle
- **Subscriber Vehicle**: Regular vehicle receiving alerts
- **API**: Application Programming Interface
- **GPS**: Global Positioning System
- **WebSocket**: Real-time communication protocol
- **PostGIS**: Geospatial extension for PostgreSQL

## 2. System Overview
The Emergency Vehicle Alert System allows emergency vehicles to share their location, status, and destination with a backend server in real-time. The server calculates which nearby vehicles should receive alerts and sends proximity-based notifications to these subscriber vehicles.

## 3. Functional Requirements

### 3.1 API Endpoints

#### 3.1.1 Vehicle Registration
- **Method**: POST `/vehicles/register`
- **Description**: Register a new emergency or regular vehicle.
- **Inputs**:
  - `vehicle_type` (emergency/subscriber)
  - `vehicle_id`
  - `model`
  - `driver`
- **Outputs**: Success/failure message with vehicle ID.

#### 3.1.2 Vehicle Location Updates
- **Method**: PUT `/vehicles/{id}/location`
- **Description**: Update vehicle location in real-time.
- **Inputs**:
  - `vehicle_id`
  - `latitude`, `longitude`
  - `timestamp`
- **Outputs**: Success message with updated location.

#### 3.1.3 Emergency Status Updates
- **Method**: PUT `/vehicles/{id}/status`
- **Description**: Update emergency vehicle status (active/inactive).
- **Inputs**:
  - `vehicle_id`
  - `status` (active/inactive)
  - `timestamp`
- **Outputs**: Success message with updated status.

#### 3.1.4 Retrieve Alerts for a Vehicle
- **Method**: GET `/alerts/{vehicle_id}`
- **Description**: Retrieve active alerts for a subscriber vehicle.
- **Inputs**: `vehicle_id`
- **Outputs**: List of alerts with proximity details.

#### 3.1.5 WebSocket Connection for Real-time Alerts
- **Description**: Establish a WebSocket connection for real-time communication between the server and vehicles. The server will push alerts to vehicles within proximity of an active emergency vehicle.

#### 3.1.6 Emergency Route Calculation (Optional)
- **Method**: GET `/routes/emergency`
- **Description**: Calculate the optimal route for an emergency vehicle.
- **Inputs**: `start_location`, `destination`
- **Outputs**: Best route details.

### 3.2 Location Tracking & Proximity Calculation
- **Description**: Emergency and subscriber vehicles will send GPS coordinates to the backend at defined intervals (e.g., every 2 seconds). The backend will calculate proximity between the emergency vehicle and subscribers using the Haversine Formula or geospatial queries provided by PostGIS.
- **Proximity Alert Threshold**: 200 meters.

### 3.3 Real-time Alerts
- The server sends proximity-based alerts to subscriber vehicles when an emergency vehicle is within a defined distance (200 meters). Updates are sent more frequently as the distance decreases.
- Real-time alerts are handled using WebSockets to minimize latency.

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- The system should handle thousands of vehicles simultaneously.
- Location updates should be processed within 500 ms.
- Alerts should be sent within 1 second of a proximity event.

### 4.2 Scalability
- The system must be scalable to accommodate high traffic volumes, especially during peak hours (e.g., when multiple emergency vehicles are active).

### 4.3 Security
- All communication between vehicles and the server must be encrypted (e.g., using HTTPS and secure WebSocket connections).
- Authentication mechanisms (JWT tokens) should be implemented to ensure only registered vehicles can access the system.

## 5. Database Model

### 5.1 Vehicles Table
| Column Name | Data Type | Description                        |
|-------------|-----------|------------------------------------|
| vehicle_id  | UUID      | Unique identifier for the vehicle  |
| vehicle_type| VARCHAR   | Type of vehicle (emergency/subscriber) |
| model       | VARCHAR   | Vehicle model                      |
| driver      | VARCHAR   | Driver name                        |
| created_at  | TIMESTAMP | Timestamp when the vehicle was registered |

### 5.2 Vehicle_Locations Table
| Column Name | Data Type          | Description                                |
|-------------|--------------------|--------------------------------------------|
| location_id | UUID               | Unique identifier for the location entry   |
| vehicle_id  | UUID               | Foreign key referencing the vehicle        |
| location    | GEOGRAPHY(POINT)   | Geospatial data (latitude, longitude)      |
| timestamp   | TIMESTAMP          | Timestamp of the location update           |

### 5.3 Emergency_Status Table
| Column Name | Data Type          | Description                                |
|-------------|--------------------|--------------------------------------------|
| status_id   | UUID               | Unique identifier for the status update    |
| vehicle_id  | UUID               | Foreign key referencing the vehicle        |
| status      | VARCHAR            | Status of the vehicle (active/inactive)    |
| timestamp   | TIMESTAMP          | Timestamp of the status update             |

### 5.4 Alerts Table
| Column Name           | Data Type          | Description                                |
|-----------------------|--------------------|--------------------------------------------|
| alert_id              | UUID               | Unique identifier for the alert            |
| emergency_vehicle_id   | UUID               | Foreign key for the emergency vehicle      |
| location              | GEOGRAPHY          | Location of the alert                      |
| destination           | GEOGRAPHY          | Destination of the emergency vehicle       |
| proximity_radius      | INTEGER            | Proximity distance for alerting (meters)   |
| created_at            | TIMESTAMP          | Timestamp when the alert was created       |

### 5.5 Alert_Subscriptions Table
| Column Name      | Data Type          | Description                                |
|------------------|--------------------|--------------------------------------------|
| subscription_id  | UUID               | Unique identifier for the alert subscription |
| alert_id         | UUID               | Foreign key for the alert                  |
| vehicle_id       | UUID               | Foreign key for the subscriber vehicle     |
| received_at      | TIMESTAMP          | Timestamp when the alert was received      |

## 6. Tech Stack

### Frontend:
- **React Native**: For mobile app development.
- **NativeWind**: For styling in React Native.
- **WebSocket**: For real-time communication between vehicles and the server.
- **OpenStreetMap**: For mapping, route planning, and traffic information.

### Backend:
- **Node.js & Express.js**: For building the backend API and handling real-time WebSocket connections.
- **WebSocket Library**: For enabling real-time communication between vehicles and the server.

### Database:
- **PostgreSQL with PostGIS extension**: For storing vehicle information, location updates, and performing geospatial queries.

### Other:
- **JWT**: For authentication between vehicles and the server.
- **HTTPS**: For secure communication.
- **Haversine Formula**: For calculating distances between latitude/longitude points.

## 7. System Architecture

The Emergency Vehicle Alert System follows a client-server architecture with real-time communication capabilities. Here's an overview of the system's key components and their interactions:

### 7.1 Mobile Application (Client)
- Developed using React Native for both iOS and Android platforms.
- Implements two main interfaces:
  1. Emergency Vehicle Interface: For sending real-time location updates and status changes.
  2. Subscriber Vehicle Interface: For receiving real-time alerts and displaying them on a map.
- Utilizes WebSocket connections for real-time communication with the server.
- Integrates OpenStreetMap for displaying vehicle locations and emergency routes.

### 7.2 Backend Server
- Built on Node.js with Express.js framework.
- Handles HTTP requests for vehicle registration, status updates, and route calculations.
- Manages WebSocket connections for real-time communication.
- Implements proximity calculation logic using PostGIS or Haversine formula.
- Processes incoming location updates and determines which subscriber vehicles should receive alerts.

### 7.3 Database
- PostgreSQL database with PostGIS extension for geospatial data handling.
- Stores vehicle information, real-time location data, emergency statuses, and alert records.

### 7.4 External Services
- Integrates with OpenStreetMap API for map rendering and route optimization.

### 7.5 Communication Flow
1. Emergency vehicles send real-time location and status updates to the server via WebSocket.
2. The server processes these updates and calculates proximity to subscriber vehicles.
3. If a subscriber vehicle is within the defined proximity radius, the server sends an alert via WebSocket.
4. The subscriber vehicle's app receives the alert and displays it on the map interface.

### 7.6 Scalability and Load Balancing
- Implements horizontal scaling for the backend servers to handle increased load.
- Uses a load balancer to distribute incoming WebSocket connections and HTTP requests across multiple server instances.

### 7.7 Security Layer
- Implements SSL/TLS for all HTTP and WebSocket communications.
- Uses JWT for authentication and authorization of vehicles accessing the system.

This architecture ensures real-time communication, scalability, and security for the Emergency Vehicle Alert System.

## 8. Project Roadmap and Checklist

### Phase 1: Setup & Basic Features (2 weeks)

#### Tasks:
- Set up backend structure
- Database schema design
- Implement vehicle registration API
- Real-time location update API
- WebSocket setup for emergency vehicles
- Basic proximity calculation

#### Detailed Checklist:
- [ ] Node.js backend structure set up
- [ ] Database schema designed with PostGIS for geospatial queries
- [ ] Vehicle registration API implemented
- [ ] Location update API for real-time vehicle tracking
- [ ] WebSocket communication established for emergency vehicles
- [ ] Basic proximity calculation logic implemented

### Phase 2: Alert System (2 weeks)

#### Tasks:
- Proximity-based alert logic
- WebSocket-based alert system
- Subscriber vehicle WebSocket connection
- Design alert UI in React Native

#### Detailed Checklist:
- [ ] Proximity-based alert logic implemented
- [ ] WebSocket communication set up for real-time alerts to subscribers
- [ ] Subscriber vehicle WebSocket client developed
- [ ] Real-time alert UI designed in React Native

### Phase 3: Mapping & Route Planning (2 weeks)

#### Tasks:
- OpenStreetMap integration
- Optimal route planning API
- Real-time updates for map display
- Fine-tune alert intervals

#### Detailed Checklist:
- [ ] OpenStreetMap integrated into the React Native app
- [ ] Optimal route planning API for emergency vehicles implemented
- [ ] Real-time updates for vehicle location on the map
- [ ] Fine-tuned alert intervals for dynamic alerts

### Phase 4: Testing & Deployment (2 weeks)

#### Tasks:
- End-to-end testing
- Load testing
- Deployment

#### Detailed Checklist:
- [ ] End-to-end testing for all APIs
- [ ] Load testing for handling multiple WebSocket connections
- [ ] Backend deployed to cloud infrastructure
- [ ] SSL and secure WebSocket communication implemented
- [ ] Auto-scaling mechanisms for handling traffic spikes
