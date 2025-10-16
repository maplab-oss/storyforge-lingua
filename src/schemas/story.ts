import z from "zod";

export const storySchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  contentOverview: z.string(),
  reasonToLearn: z.string(),
  content: z.string(),
  deleted: z.boolean().optional(),
});

export const storiesSchema = storySchema.array();
