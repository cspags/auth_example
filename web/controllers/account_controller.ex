defmodule AuthExample.AccountController do
  use AuthExample.Web, :controller

  alias AuthExample.Account

  plug :scrub_params, "account" when action in [:create, :update]
  plug :action

  def index(conn, _params) do
    accounts = Repo.all(Account)
    render(conn, "index.html", accounts: accounts)
  end

  def new(conn, _params) do
    changeset = Account.changeset(%Account{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"account" => account_params}) do
    changeset = Account.changeset(%Account{}, account_params)

    if changeset.valid? do
      Repo.insert(changeset)

      conn
      |> put_flash(:info, "Account created successfully.")
      |> redirect(to: account_path(conn, :index))
    else
      render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    account = Repo.get(Account, id)
    render(conn, "show.html", account: account)
  end

  def edit(conn, %{"id" => id}) do
    account = Repo.get(Account, id)
    changeset = Account.changeset(account)
    render(conn, "edit.html", account: account, changeset: changeset)
  end

  def update(conn, %{"id" => id, "account" => account_params}) do
    account = Repo.get(Account, id)
    changeset = Account.changeset(account, account_params)

    if changeset.valid? do
      Repo.update(changeset)

      conn
      |> put_flash(:info, "Account updated successfully.")
      |> redirect(to: account_path(conn, :index))
    else
      render(conn, "edit.html", account: account, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    account = Repo.get(Account, id)
    Repo.delete(account)

    conn
    |> put_flash(:info, "Account deleted successfully.")
    |> redirect(to: account_path(conn, :index))
  end
end
