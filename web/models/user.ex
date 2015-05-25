defmodule AuthExample.User do
  use AuthExample.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps
  end

  @required_fields ~w(name email password_hash)
  @optional_fields ~w()

  @create_required_fields ~w(name email password)
  @sign_in_required_fields ~w(email password)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def create_user_changeset(model, params \\ :empty) do
    model
    |> cast(params, @create_required_fields, @optional_fields)
  end

  def sign_in_changeset(model, params \\ :empty) do
    model
    |> cast(params, @sign_in_required_fields, @optional_fields)
  end
end
