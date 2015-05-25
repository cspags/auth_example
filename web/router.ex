defmodule AuthExample.Router do
  use AuthExample.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AuthExample do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    get "/signup", UserController, :new
    post "/signup", UserController, :create

    get "/signin", SessionController, :new
    post "/signin", SessionController, :create
    delete "/signout", SessionController, :delete

    resources "accounts", AccountController
  end

  # Other scopes may use custom stacks.
  # scope "/api", AuthExample do
  #   pipe_through :api
  # end
end
