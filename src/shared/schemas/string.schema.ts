import z from 'zod';

type Message = {
  required: string;
  invalid: string;
};

const fallbackMessage: Message = {
  required: 'it is required',
  invalid: 'it must be a string',
};

export function stringCreateSchema({ message = {} }: { message?: Partial<Message> }) {
  const merged = { ...fallbackMessage, ...message };

  return z
    .string({
      error: ({ input }) => {
        return input === undefined ? merged.required : merged.invalid;
      },
    })
    .trim();
}
