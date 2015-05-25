defmodule AuthExample.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use AuthExample.Web, :controller
      use AuthExample.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Model
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      # Alias the data repository and import query/model functions
      alias AuthExample.Repo
      import Ecto.Model
      import Ecto.Query, only: [from: 2]

      # Import URL helpers from the router
      import AuthExample.Router.Helpers

      def is_signed_in?(conn) do
        case get_session(conn, :user_id) do
          nil -> false
          _ -> true
        end
      end

      def current_user(conn) do
        case get_session(conn, :user_id) do
          nil -> nil
          user_id -> Repo.get(AuthExample.User, user_id)
        end
      end

      def sign_in(conn, user) do
        put_session(conn, :user_id, user.id)
      end

      def sign_out(conn) do
        delete_session(conn, :user_id)
      end
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Import URL helpers from the router
      import AuthExample.Router.Helpers

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      # Alias the data repository and import query/model functions
      alias AuthExample.Repo
      import Ecto.Model
      import Ecto.Query, only: [from: 2]

    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
