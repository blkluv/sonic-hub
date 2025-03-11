import { getGridFSBucket } from "./client";

export const getContainerClient = async () => {
  // GridFS doesn't need container creation as it automatically 
  // creates collections when they're first used
  return await getGridFSBucket();
};