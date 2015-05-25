use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :auth_example, AuthExample.Endpoint,
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Configure your database
config :auth_example, AuthExample.Repo,
  adapter: Ecto.Adapters.Postgres,
  hostname: System.get_env("DB_HOSTNAME"),
  username: System.get_env("DB_USERNAME"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_NAME"),
  size: 20 # The amount of database connections in the pool
