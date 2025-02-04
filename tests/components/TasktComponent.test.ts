import { describe, expect, test } from "vitest"
import { mount } from '@vue/test-utils'
import TaskComponent from '@/components/TaskComponent.vue'


describe('<TestComponent />', () => {

  test('should match snapshot', () => {

    const wrapper = mount(TaskComponent, {
      props: {
        tasks: [
          {
            id: "jkakjsha-asasasas-asaas",
            place: "home",
            task: "eat",
            date: "2025-02-01 10:00",
            status: 'pending'
          }
        ],
        filtro: 'all',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

  })

  // test('', () => {


  //   const wrapper = mount(TaskComponent, {
  //     props: {
  //       tasks: [{

  //       }],
  //       filtro: 'all',
  //     },
  //   })


  // })

})
