class JobSequencing {
    constructor(job) {
        this.job = job
        this.timeslot = []
        this.dmax = 0
    }

    orderJob() {
        // Sort job profit desc
        this.job.sort((a, b) => a.profit < b.profit ? 1 : -1)

        return this.job
    }

    findDmax() {
        let dmax = 0

        for (let i = 0; i < this.job.length; i++) {
            dmax = this.job[i].deadline > dmax ? this.job[i].deadline : dmax
        }

        this.dmax = dmax

        return this.dmax
    }

    minValue(x, y) {
        if (x < y) return x

        return y
    }

    filledTimeSlot() {
        let timeslot = []
        let k = 0

        for (let i = 0; i < this.job.length; i++) {
            k = this.minValue(this.dmax, this.job[i].deadline)
            while (k >= 1) {
                if (typeof timeslot[k - 1] === "undefined") {
                    timeslot[k - 1] = i
                    break
                }

                k--
            }
        }
        this.timeslot = timeslot

        return this.timeslot
    }

    requiredJob() {
        let totalProfit = 0

        for (let i = 0; i < this.dmax; i++) {
            if (typeof this.timeslot[i] !== "undefined") {
                totalProfit += this.job[this.timeslot[i]].profit
            }
        }

        return totalProfit
    }

    calculate() {
        this.orderJob()
        this.findDmax()
        this.filledTimeSlot()
        this.requiredJob()
    }
}