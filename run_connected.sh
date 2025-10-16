#!/bin/bash

export VITE_LOLLI_BASE_URL=http://localhost:3900
export VITE_SUPABASE_URL=http://localhost:39985
export SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.Dojy8lLgKnPzzP0rIkH5gXvNX3A4kRs0uyODhzCo3Pk"

pnpm run dev
