import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import Counter from "@/Counter"

const localVue = createLocalVue()
localVue.use(Vuex)

describe("Counter", () => {
  it("Sanity check", () => {
    expect(true).toBeTruthy()
  })

  let wrapper
  let decreaseButton
  let increaseButton
  let store
  let actions
  beforeEach(() => {
    actions = {
      increment: jest.fn(),
      decrement: jest.fn(),
    }
    store = new Vuex.Store({
      actions,
    }) 
    wrapper = shallowMount(Counter, { store, localVue })
    decreaseButton = wrapper.findAll("button").at(0)
    increaseButton = wrapper.findAll("button").at(1)
  })

  describe("Elements exist check", () => {
    it("Component exists", () => {
      expect(wrapper.exists()).toBeTruthy()
    })

    it("Decrease button exists", () => {
      expect(decreaseButton.exists()).toBeTruthy()
    })

    it("Increase button exists", () => {
      expect(increaseButton.exists()).toBeTruthy()
    })
  
    it("Count exists", () => {
      const count = wrapper.find("span")
      expect(count.exists()).toBeTruthy()
    })
  })

  describe("Elements text check", () => {
    it("Decrease button text is Decrease", () => {
      expect(decreaseButton.text()).toBe("Decrease")
    })
  
    it("Increase button text is Increase", () => {
      expect(increaseButton.text()).toBe("Increase")
    })

    it("Count text is k", () => {

    })
    
  })

  describe("Functionality check", () => {
    it("Decrease button calls decrement action", async () => {  
      const decreaseButton = wrapper.findAll("button").at(0)
      await decreaseButton.trigger("click")
      expect(actions.decrement).toBeCalledTimes(1)
    })

    it("Increase button calls increment action", async () => {
      const increaseButton = wrapper.findAll("button").at(1)
      await increaseButton.trigger("click")
      expect(actions.increment).toBeCalledTimes(1)
    })
  })
})
