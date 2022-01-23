import { shallowMount, createLocalVue } from "@vue/test-utils"
import Counter from "@/Counter"
import Vuex from "vuex"
import { state, mutations, actions } from "@/store"

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

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations,
      actions
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
    test("Decrease button text is correct", () => {
      expect(decreaseButton.text()).toBe("Decrease")
    })
  
    test("Increase button text is correct", () => {
      expect(increaseButton.text()).toBe("Increase")
    })

    test("Count text is correct", () => {
      const countSpan = wrapper.find("span")
      expect(countSpan.text()).toBe("0k")
    })
  })

  describe("Functionality check", () => {
    test("Decrease button works correctly", async () => {
      await decreaseButton.trigger("click")
      expect(state.count).toBe(-1)
    })

    test("Increase button works correctly", async () => {
      await increaseButton.trigger("click")
      expect(state.count).toBe(0)
    })

    test("Increase and decrease buttons work correctly together", async () => {
      await increaseButton.trigger("click")
      await increaseButton.trigger("click")
      await decreaseButton.trigger("click")
      expect(state.count).toBe(1)
    })

    test("Count text updates accordingly", async () => {
      const countSpan = wrapper.find("span")
      await increaseButton.trigger("click")
      await increaseButton.trigger("click")
      // beforeEach works before each describe
      // so the count will be 3k instead of 2k
      expect(countSpan.text()).toBe("3k")
    })
  })
})
