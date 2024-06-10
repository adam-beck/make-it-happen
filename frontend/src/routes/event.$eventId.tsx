import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { client } from "../client";

export const Route = createFileRoute("/event/$eventId")({
  component: () => <EventSetupPage />,
});

const EventSetupPage = () => {
  const params = Route.useParams();
  const id = useId();
  const updateEvent = useMutation({
    mutationFn: (eventName: string) => {
      return client.event({ eventId: params.eventId }).put({
        eventName,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      eventName: "",
    },
    onSubmit: ({ value }) => {
      updateEvent.mutate(value.eventName);
      console.log(value);
    },
  });
  return (
    <div>
      Event ID: {params.eventId}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="eventName"
            children={(field) => (
              <>
                <label htmlFor={id}>Event Name:</label>
                <input
                  id={id}
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
          <div>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

