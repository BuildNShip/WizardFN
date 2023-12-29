import { privateGateway } from '../services/apiGateways';
import { buildVerse } from '../services/urls';

export const getEndpoints = async (projectId: string, collectionId: string) => {
  privateGateway
    .get(buildVerse.getEndpoints(projectId, collectionId))
    .then((response) => {
      console.log(response.data);
      // setEndpoints(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveEndpoint = async (endpoint: APIData) => {
  console.log('endpoint', endpoint);

  const apiResponses = endpoint.apiResponses.map((response) => ({
    response_code: response.responseCode,
    body: response.body,
    is_active: response.isActive,
    description: response.description,
    order: response.order,
  }));

  const data = {
    end_point_data: {
      ...(endpoint.endPointData.id && { id: endpoint.endPointData.id }),
      title: endpoint.endPointData.title,
      collection_id: endpoint.endPointData.collectionId,
      method: endpoint.endPointData.method,
      url: endpoint.endPointData.url,
      description: endpoint.endPointData.description,
      is_active: endpoint.endPointData.isActive,
      cors: endpoint.endPointData.cors,
      token: endpoint.endPointData.token,
    },
    api_responses: apiResponses,
  };

  console.log('data', data);

  privateGateway
    .post(buildVerse.saveEndpoint, data)
    .then((response) => {
      console.log(response.data);
      // setEndpoints(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
