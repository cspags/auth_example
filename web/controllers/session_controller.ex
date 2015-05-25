defmodule AuthExample.SessionController do
  use AuthExample.Web, :controller

  alias AuthExample.User

  plug :scrub_params, "user" when action in [:create, :update]
  plug :action

  def new(conn, _params) do
    changeset = User.sign_in_changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    # Make sure all the fields have been filled out
    sign_in_changeset = User.sign_in_changeset(%User{}, user_params)
    if !sign_in_changeset.valid? do
      changeset = sign_in_changeset
    else
      query = from u in User,
              where: u.email == ^user_params["email"],
              select: u

      user = Repo.one(query)

      if user != nil && Comeonin.Bcrypt.checkpw(user_params["password"], user.password_hash) do
        conn
        |> sign_in(user)
        |> put_flash(:info, "Signed in successfully.")
        |> redirect(to: page_path(conn, :index))
      else
        changeset = Ecto.Changeset.add_error(sign_in_changeset, :"", "Email or password was incorrect.")
      end
    end

    # Didn't pass validation
    render(conn, "new.html", changeset: changeset)
  end

  def delete(conn, _params) do
  	conn
    |> sign_out
    |> put_flash(:info, "You are now signed out.")
    |> redirect(to: page_path(conn, :index))
  end
end
