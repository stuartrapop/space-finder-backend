import { handler } from '../../services/SpacesTable/Read';
import { APIGatewayProxyEvent } from './../../node_modules/@types/aws-lambda/trigger/api-gateway-proxy.d';

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: '74182cdb-df71-4fa5-b37a-0369d30fd351',
  },
} as any;

// const event: APIGatewayProxyEvent = {
//   body: {
//     name: 'someName',
//     location: 'some location',
//   },
// } as any;
const result = handler(event as any, {} as any);
result.then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  items.Items.forEach((element: any) => {
    console.log(element['name']);
  });
  console.log('123');
});
