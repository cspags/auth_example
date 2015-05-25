defmodule AuthExample.Repo.Migrations.CreateAccount do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :name, :string
      add :test_api_key, :string
      add :prod_api_key, :string

      timestamps
    end

  end
end
