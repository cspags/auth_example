defmodule AuthExample.UserTest do
  use AuthExample.ModelCase

  alias AuthExample.User

  @valid_attrs %{email: "some content", name: "some content", password: "some content", password_salt: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
