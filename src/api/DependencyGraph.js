import { backendUrl } from './Url'

export function getGraph(libId) {
  return fetch(`${backendUrl}/migration/mvn/lib/${libId}/get`, {
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => resp.json())
}

export function getDependencyInfo(libId) {
  return fetch(`${backendUrl}/project/mvn/lib/get/${libId}`, {
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => resp.json())
}
