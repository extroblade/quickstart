interface ILoading<T = unknown> {
  error?: string | null;
  isLoading?: boolean;
  data?: T | null;
}

export const isErrorWithMessage = (
  error: unknown,
): error is { message: string } => {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
};

const handleLoadingThunk = ({
  action,
  builder,
  field,
}: {
  action: any;
  builder: any;
  field: any;
}) => {
  builder
    .addCase(action.pending, (state: any) => {
      state[field] = { isLoading: true, error: null };
    })
    .addCase(action.rejected, (state: any, { error }: any) => {
      state[field] = {
        isLoading: false,
        error: isErrorWithMessage(error)
          ? error.message
          : "notification.getNotifications: Unknown error",
      };
    })
    .addCase(action.fulfilled, (state: any, { payload }: any) => {
      state[field] = { isLoading: false, error: null, data: payload };
    });
};
