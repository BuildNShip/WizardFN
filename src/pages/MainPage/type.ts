type EndpointData = {
  id: string;
  title: string;
  collectionId: string;
  method: string;
  url: string;
  description: string;
  isActive: boolean;
  cors: string[];
  token: string;
};

type ApiResponse = {
  responseCode: number;
  body: string;
  isActive: boolean;
  description: string;
  order: number;
};

type APIData = {
  endPointData: EndpointData;
  apiResponses: ApiResponse[];
};
