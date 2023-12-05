class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(item) {
        if (this.size() == 10) {
            this.dequeue();
        }
        this.items.push(item);
    }

    // Remove and return the front element of the queue
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Return the front element of the queue without removing it
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return the size of the queue
    size() {
        return this.items.length;
    }

    // Print the elements of the queue
    printQueue() {
        console.log(this.items);
    }

    // Get back array
    getMySequence() {
        return this.items;
    }
}

export default Queue;
