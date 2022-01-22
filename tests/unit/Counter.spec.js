import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import Counter from "@/Counter"

const localVue = createLocalVue()
localVue.use(Vuex)

describe("Counter", () => {
  test("Sanity check", () => {
    expect(true).toBeTruthy()
  })

  let wrapper
  let decreaseButton
  let increaseButton
  let store
  let actions
  let state

  beforeEach(() => {
    actions = {
      increment: jest.fn(),
      decrement: jest.fn(),
    }
    state = {
      count: 0,
    }
    store = new Vuex.Store({
      state,
      actions,
    }) 
    wrapper = shallowMount(Counter, { store, localVue })
    decreaseButton = wrapper.findAll("button").at(0)
    increaseButton = wrapper.findAll("button").at(1)
  })

  describe("Elements exist check", () => {
    test("Component exists", () => {
      expect(wrapper.exists()).toBeTruthy()
    })

    test("Decrease button exists", () => {
      expect(decreaseButton.exists()).toBeTruthy()
    })

    test("Increase button exists", () => {
      expect(increaseButton.exists()).toBeTruthy()
    })
  
    test("Count exists", () => {
      const countSpan = wrapper.find("span")
      expect(countSpan.exists()).toBeTruthy()
    })
  })

  describe("Elements text check", () => {
    test("Decrease button text is Decrease", () => {
      expect(decreaseButton.text()).toBe("Decrease")
    })
  
    test("Increase button text is Increase", () => {
      expect(increaseButton.text()).toBe("Increase")
    })

    test("Count text should be same as state count", () => {
      const countSpan = wrapper.find("span")
      expect(countSpan.text()).toBe(store.state.count + "k")
    })
  })

  describe("Functionality check", () => {
    test("Decrease button calls decrement action", async () => {  
      await decreaseButton.trigger("click")
      expect(actions.decrement).toBeCalledTimes(1)
    })

    test("Increase button calls increment action", async () => {
      await increaseButton.trigger("click")
      expect(actions.increment).toBeCalledTimes(1)
    })

    test("When increase is clicked twice and decrease clicked once", async () => {
      await increaseButton.trigger("click")
      await increaseButton.trigger("click")
      await decreaseButton.trigger("click")
      expect(actions.increment).toBeCalledTimes(2)
      expect(actions.decrement).toBeCalledTimes(1)
    })
  })
})
