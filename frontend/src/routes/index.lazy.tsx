import { useMutation } from "@tanstack/react-query";
import "./App.css";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { client } from "../client";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate({ from: "/" });
  const createEventMutation = useMutation({
    mutationFn: () => {
      return client.event.post();
    },
    onSuccess: (response) => {
      const eventId = response.data?.id;

      if (!eventId) {
        return;
      }

      navigate({ to: "/event/$eventId", params: { eventId } });
    },
  });
  return (
    <>
      <h1>Make It Happen</h1>
      <button onClick={() => createEventMutation.mutate()}>
        Create New Event
      </button>
    </>
  );
}
