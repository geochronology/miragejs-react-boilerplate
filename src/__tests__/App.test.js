import React from "react"
import { render, waitForElement } from "@testing-library/react"
import App from "../App"
import { makeServer } from "../server"

let server

beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

it("shows the users from our server", async () => {
  server.create("user", { name: "Luke" })
  server.create("user", { name: "Leia" })

  const { getByTestId } = render(<App />)
  await waitForElement(() => getByTestId("user-1"))
  await waitForElement(() => getByTestId("user-2"))

  expect(getByTestId("user-1")).toHaveTextContent("Luke")
  expect(getByTestId("user-2")).toHaveTextContent("Leia")
})