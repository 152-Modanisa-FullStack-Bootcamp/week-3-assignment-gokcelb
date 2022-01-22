import { shallowMount, createLocalVue } from "@vue/test-utils"
import App from "@/App"
import Vuex from "vuex"

const localVue = createLocalVue()
localVue.use(Vuex)


describe("App", () => {
    describe("Elements exist check", () => {
        let wrapper
        let store
        let state
        let getters

        beforeEach(() => {
            getters = {
                getCount: jest.fn()
            }
            state = {
                count: 0
            }
            store = {
                state,
                getters
            }
            wrapper = shallowMount(App, { store, localVue })
        })

        test("Component exists", () => {
            expect(wrapper.exists()).toBeTruthy()
        })

        test("Title exists", () => {
            const title = wrapper.find("h1")
            expect(title.exists()).toBeTruthy()
        })
    })

    const testCases = [
        { count: 10, message: "Danger!!! Case count is 10k" },
        { count: 5, message: "Life is normal. Case count is 5k" },
        { count: 2, message: "So safe. Case count is 2k" }
    ]
    for(let testCase of testCases) {
        test("Message changes according to count value", () => {
            const state = {
                count: testCase.count
            }
            const getters = {
                getCount: jest.fn()
            }
            const store = {
                state,
                getters
            }
            const wrapper = shallowMount(App, { store, localVue })
            const msg = wrapper.find("div.notificationArea").text()
            expect(msg).toBe(testCase.message)
        })
    }
})