import { backendUrl } from '@/api/Url.js'

export default async function uploadPom(content) {
  return fetch(`${backendUrl}/library/mvn/pom/analyse`, {
    method: 'POST',
    body: JSON.stringify({ pom: await content.text() }),
  }).then(resp => resp.json())
}
