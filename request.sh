#!/bin/bash

curl -d '{"key":"value"}'  -H "Content-Type: application/json"  -X POST http://localhost:3000/messages
