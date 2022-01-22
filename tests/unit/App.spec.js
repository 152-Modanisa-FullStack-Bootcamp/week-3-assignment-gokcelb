import { shallowMount, createLocalVue } from "@vue/test-utils"
import App from "@/App"
import Vuex from "vuex"

const localVue = createLocalVue()
localVue.use(Vuex)


describe("App", () => {
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

    describe("Elements exist check", () => {
        test("Component exists", () => {
            expect(wrapper.exists()).toBeTruthy()
        })

        test("Title exists", () => {
            const title = wrapper.find("h1")
            expect(title.exists()).toBeTruthy()
        })
    })

    test("Title is 'Daily Corona Cases in Turkey'", () => {
        const title = wrapper.find("h1")
        expect(title.text()).toBe("Daily Corona Cases in Turkey")
    })

    describe("Dynamic tests", () => {
        const testCases = [
            { count: 10, message: "Danger!!! Case count is 10k", class: "danger" },
            { count: 5, message: "Life is normal. Case count is 5k", class: "normal" },
            { count: 2, message: "So safe. Case count is 2k", class: "safe" }
        ]
        for(let testCase of testCases) {
            test("Message and class change according to count", async () => {
                const state = {
                    count: testCase.count
                }
                const store = {
                    state,
                }
                const computed = {
                    getCount: () => state.count
                }
                const wrapper = shallowMount(App, { store, computed, localVue })
                const notifArea = wrapper.find("div.notificationArea")
                const msg = notifArea.text()
                const notifClasses = notifArea.classes()
                
                expect(msg).toBe(testCase.message)
                expect(notifClasses).toContain(testCase.class)
            })
        }
    })
})