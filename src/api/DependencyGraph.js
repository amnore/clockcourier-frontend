import { backendUrl } from './Url'

export default function getGraph(libId) {
  return fetch(`${backendUrl}/migration/mvn/lib/${libId}/get`, {
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => resp.json())
}
