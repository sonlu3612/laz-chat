# Laz Chat

## Getting Started

Prerequisites

- .NET
- PostgreSQL

Environment Setup

1. Create a `.env` file in the `server` directory with your PostgreSQL connection string, example:

```
DB_HOST="localhost"
DB_NAME="postgres"
DB_USER="postgres"
DB_PASSWORD="abc123"
```

2. Install dependencies & `dotnet-ef` package:

```bash
dotnet restore

dotnet tool install --global dotnet-ef
```

3. Update database:

```bash
dotnet ef database update
```

4. Running the Server:

```bash
dotnet run
```
