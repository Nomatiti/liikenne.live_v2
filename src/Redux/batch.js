/* Batch variable that holds the
 *
 *
 */

import { vehicleAdd } from "./actions";

let updateStack = {
    set addUpdate(item) {
        this.test++
        if (this.updatingVehicles.includes(item.id)) {
            //Item is already in stack

            this.modified++

            this.actions[item.id] = {
                ...this.actions[item.id],
                ...item,
                content: {
                    ...this.actions[item.id].content,
                    ...item.content
                }
            }

            // switch (item.api) {
            //     case "HSL":
            //
            //         this.actions[item.id] = {
            //             ...this.actions[item.id],
            //             ...item,
            //             content: {
            //                 ...this.actions[item.id].content,
            //                 ...item.content
            //             }
            //         }
            //         break;
            //
            //     default:
            //         break;
            // }
        } else {
            this.updatingVehicles.push(item.id)

            if (item.content.content) {
                console.log(item.content)
            }

            this.actions[item.id] = vehicleAdd(item.id, item.displayName, item.vehicleType, item.api, item.coordinates, item.content)
        }
    },
    get batchedActions () {
        let out = []
        this.updatingVehicles.forEach(id => {
            out.push(this.actions[id])
        })
        // console.log("Modified:", this.modified, this.test)
        return out
    },
    get countBatched () {
        return this.updatingVehicles.length
    },
    set reset(i) {
        this.updatingVehicles = []
        this.actions = {}
        this.modified = 0
        this.test = 0
    },
    updatingVehicles: [],
    actions: {},
    modified: 0,
    test: 0
};

export default updateStack;