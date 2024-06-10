import { useForm } from "@tanstack/react-form";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { client } from "../client";
import { useMutation } from "@tanstack/react-query";

function CreatePage() {
  const navigate = useNavigate({ from: "/event/$eventId" });

  const mutation = useMutation({
    mutationFn: (eventName: string) => {
      return client.event.post({ eventName });
    },
  });
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.name, {
        onSuccess: (response) => {
          const eventId = response.data?.id;

          if (!eventId) {
            return;
          }

          navigate({ to: "/event/$eventId", params: { eventId } });
        },
      });
    },
  });
  return (
    <>
      <h1>Create New Event</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="name"
              children={(field) => (
                <input
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export const Route = createLazyFileRoute("/create")({
  component: () => <CreatePage />,
});
