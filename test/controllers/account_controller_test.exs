defmodule AuthExample.AccountControllerTest do
  use AuthExample.ConnCase

  alias AuthExample.Account
  @valid_attrs %{name: "some content", prod_api_key: "some content", test_api_key: "some content"}
  @invalid_attrs %{}

  setup do
    conn = conn()
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, account_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing accounts"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, account_path(conn, :new)
    assert html_response(conn, 200) =~ "New account"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, account_path(conn, :create), account: @valid_attrs
    assert redirected_to(conn) == account_path(conn, :index)
    assert Repo.get_by(Account, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, account_path(conn, :create), account: @invalid_attrs
    assert html_response(conn, 200) =~ "New account"
  end

  test "shows chosen resource", %{conn: conn} do
    account = Repo.insert %Account{}
    conn = get conn, account_path(conn, :show, account)
    assert html_response(conn, 200) =~ "Show account"
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    account = Repo.insert %Account{}
    conn = get conn, account_path(conn, :edit, account)
    assert html_response(conn, 200) =~ "Edit account"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    account = Repo.insert %Account{}
    conn = put conn, account_path(conn, :update, account), account: @valid_attrs
    assert redirected_to(conn) == account_path(conn, :index)
    assert Repo.get_by(Account, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    account = Repo.insert %Account{}
    conn = put conn, account_path(conn, :update, account), account: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit account"
  end

  test "deletes chosen resource", %{conn: conn} do
    account = Repo.insert %Account{}
    conn = delete conn, account_path(conn, :delete, account)
    assert redirected_to(conn) == account_path(conn, :index)
    refute Repo.get(Account, account.id)
  end
end
