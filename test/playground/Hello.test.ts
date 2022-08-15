import { handler } from '../../services/SpacesTable/Create';
import { APIGatewayProxyEvent } from './../../node_modules/@types/aws-lambda/trigger/api-gateway-proxy.d';

// const event: APIGatewayProxyEvent = {
//   queryStringParameters: {
//     spaceId: '3c286770-dc47-4ddc-92ae-444ff0a5d53d',
//   },
//   // body: {
//   //   location: 'tes2 location',
//   // },
// } as any;

const event: APIGatewayProxyEvent = {
  body: {
    name: 'someName',
    location: 'Washington',
  },
} as any;
const result = handler(event as any, {} as any);
result
  .then((apiResult) => {
    console.log(apiResult);
    const items = JSON.parse(apiResult.body);
    // items.forEach((element: any) => {
    //   console.log(element['name']);
    // });
    console.log('123');
  })
  .catch((error) => {
    console.log(error);
  });
