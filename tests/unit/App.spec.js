import { shallowMount } from "@vue/test-utils"
import App from "@/App"

describe("App", () => {
    describe("Elements exist check", () => {
        const wrapper = customMount()
        test("Component exists", () => {
            expect(wrapper.exists()).toBeTruthy()
        })

        test("Title exists", () => {
            const title = wrapper.find("h1")
            expect(title.exists()).toBeTruthy()
        })
    })

    test("Title text is correct", () => {
        const wrapper = customMount()
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
            test("Message and class change accordingly", async () => {
                const state = {
                    count: testCase.count
                }
                const getters = {
                    getCount: testCase.count
                }
                const $store = {
                    state,
                    getters
                }
                const wrapper = shallowMount(App, {
                    mocks: {
                        $store,
                    }
                })
                const notifArea = wrapper.find("div.notificationArea")
                const msg = notifArea.text()
                const notifClasses = notifArea.classes()
                
                expect(msg).toBe(testCase.message)
                expect(notifClasses).toContain(testCase.class)
            })
        }
    })
})

function customMount() {
    const getters = {
        getCount: jest.fn()
    }
    const state = {
        count: 0
    }
    const $store = {
        state,
        getters
    }
    return shallowMount(App, {
        mocks: {
            $store
        }
    })
}