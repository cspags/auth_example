defmodule AuthExample.UserController do
  use AuthExample.Web, :controller

  alias AuthExample.User

  plug :scrub_params, "user" when action in [:create, :update]
  plug :action

  def new(conn, _params) do
  	changeset = User.create_user_changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    # Make sure all the fields have been filled out
    create_user_changeset = User.create_user_changeset(%User{}, user_params)
    if !create_user_changeset.valid? do
      changeset = create_user_changeset
    else
      # Try to hash the password
      changeset = (Comeonin.create_user(user_params) |> on_hash_password(create_user_changeset))

      if changeset.valid? do
        user = Repo.insert(changeset)

        conn
        |> sign_in(user)
        |> put_flash(:info, "User created successfully.")
        |> redirect(to: page_path(conn, :index))
      end
    end

    # Didn't pass validation
    render(conn, "new.html", changeset: changeset)
  end

  defp on_hash_password({:ok, user}, _changeset) do
    User.changeset(%User{}, user)
  end

  defp on_hash_password({:error, error}, changeset) do
    Ecto.Changeset.add_error(changeset, :"", error)
  end

  # defp get_errors(errors) do
  #   if Enum.empty?(errors) do
  #     ""
  #   end

  #   msg = Enum.reduce(errors, "", fn({key, val}, state) ->
  #     field_name = key
  #       |> to_string
  #       |> String.capitalize

  #     state <> field_name <> " " <> val <> ", "
  #   end)

  #   msg
  #   |> String.rstrip
  #   |> String.rstrip(?,)
  # end
end
