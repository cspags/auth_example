defmodule AuthExample.AccountTest do
  use AuthExample.ModelCase

  alias AuthExample.Account

  @valid_attrs %{name: "some content", prod_api_key: "some content", test_api_key: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Account.changeset(%Account{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Account.changeset(%Account{}, @invalid_attrs)
    refute changeset.valid?
  end
end
