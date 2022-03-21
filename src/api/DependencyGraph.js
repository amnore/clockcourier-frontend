import { backendUrl } from './Url'

export default function getGraph(projectId) {
  return fetch(`${backendUrl}/project/mvn/mock/${projectId}/graph`, {
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => resp.json())
}
