defmodule AuthExample.PageController do
  use AuthExample.Web, :controller

  plug :action

  def index(conn, _params) do

    is_signed_in = is_signed_in?(conn)
    users_name = (case current_user(conn) do
       nil -> ""
       user -> user.name
      end)

    render conn, "index.html", is_signed_in: is_signed_in, users_name: users_name
  end
end
