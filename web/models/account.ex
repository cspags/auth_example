defmodule AuthExample.Account do
  use AuthExample.Web, :model

  schema "accounts" do
    field :name, :string
    field :test_api_key, :string
    field :prod_api_key, :string

    timestamps
  end

  @required_fields ~w(name test_api_key prod_api_key)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
