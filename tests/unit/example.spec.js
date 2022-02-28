import { flushPromises, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { nextTick } from 'vue'
import axios from 'axios'

jest.mock('axios')

test('update count', async () => {
  axios.mockResolvedValue([1, 2, 3, 4])
  const wrapper = mount(HelloWorld)
  await flushPromises()
  expect(wrapper.findAll('.hello2').map(e => e.text())).toEqual(['1', '2', '3', '4'])
})