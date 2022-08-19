import "./style.css";

class betterScrollAnimation {
    name: string = "bescan";
    prefix = "bsa-";
    constructor(option?: {
        name?: string;
        prefix?: string;
        rootMargin?: string;
        threshold?: number;
        errorXD?: number;
        errorXU?: number;
        errorYD?: number;
        errorYU?: number;
        elToScroll?: Window | HTMLElement;
    }) {
        this.name = option?.name || this.name;
        this.prefix = option?.prefix || this.prefix;
        const elHt = document.querySelectorAll<HTMLElement>(`[${this.name}]`);
        const win = {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
        };
        window.addEventListener("resize", () => {
            win.innerHeight = window.innerHeight;
            win.innerWidth = window.innerWidth;
        });
        let elToWatch: Array<number> = [];
        const errorXD = option?.errorXD || 0; //150
        const errorXU = option?.errorXU || 0; //20
        const errorYD = option?.errorYD || 0; //150
        const errorYU = option?.errorYU || 0; //20
        const scroll = option?.elToScroll || window;
        scroll.addEventListener("scroll", () => {
            if (elToWatch.length == 0) return;
            elToWatch.forEach((e, i) => {
                const bou = elHt[e].getBoundingClientRect();
                const el = elHt[e];
                //Y check
                if (
                    bou.top > win.innerHeight + bou.height - errorYD &&
                    bou.bottom > win.innerHeight + bou.height - errorYD
                ) {
                    this.firstExit(el, elToWatch, i);
                }
                if (bou.bottom < errorYU && bou.top < errorYU) {
                    this.secondExit(el, elToWatch, i);
                }
                //X check
                if (bou.left < errorXU && bou.right < errorXU) {
                    this.secondExit(el, elToWatch, i);
                }
                if (
                    bou.left > win.innerWidth + bou.width - errorXD &&
                    bou.right > win.innerWidth + bou.width - errorXD
                ) {
                    this.firstExit(el, elToWatch, i);
                }
            });
        });
        const config = {
                root: null, // Sets the framing element to the viewport
                rootMargin: option?.rootMargin || "0px",
                threshold: option?.threshold || 0.5,
            },
            observer = new IntersectionObserver(entries => {
                entries.forEach(el => {
                    const {
                        target: { classList, attributes },
                        isIntersecting,
                    } = el;

                    const transition = attributes.getNamedItem(
                        this.name
                    )!.value;
                    const elementoHtmlIndex = parseInt(
                        attributes.getNamedItem(this.prefix + "index")!.value
                    );
                    //const elementoHtml = elHt[elementoHtmlIndex];

                    if (isIntersecting) {
                        //intersectionRatio >= 0.5
                        this.isCustomAnimation(transition, () =>
                            this.setClass(attributes, classList)
                        );
                        if (
                            attributes.getNamedItem(this.prefix + "SA")
                                ?.value !== undefined
                        )
                            return observer.unobserve(el.target);

                        if (elToWatch.indexOf(elementoHtmlIndex) === -1)
                            elToWatch.push(elementoHtmlIndex);
                    }
                    if (elToWatch.indexOf(elementoHtmlIndex) !== -1) return;

                    if (
                        attributes.getNamedItem(this.prefix + "OU")?.value !==
                        undefined
                    ) {
                        if (!(el.boundingClientRect.top < 0))
                            return this.isCustomAnimation(transition, () =>
                                this.setClass(attributes, classList, "remove")
                            );
                    } else {
                        return this.isCustomAnimation(transition, () =>
                            this.setClass(attributes, classList, "remove")
                        );
                    }
                });
            }, config);

        elHt.forEach((ele, i) => {
            ele.setAttribute(this.prefix + "index", i.toString());
            observer.observe(ele);
        });
    }
    isCustomAnimation(transition: string, ifCall: () => void) {
        if (transition === "" || transition.toLowerCase() == "custom")
            return ifCall();
    }
    setClass(attributes: NamedNodeMap, classList: DOMTokenList, rem?: string) {
        const classTrans = attributes.getNamedItem(
            `${this.prefix}tranClass`
        )?.value;
        if (!rem) return classList.add(classTrans || "active");
        classList.remove(classTrans || "active");
    }
    delIndex(arr: Array<number>, index: number) {
        for (let i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr.pop();
    }
    firstExit(el: HTMLElement, elToWatch: Array<number>, i: number) {
        this.delIndex(elToWatch, i);
        this.isCustomAnimation(
            el.attributes.getNamedItem(this.name)!.value,
            () => this.setClass(el.attributes, el.classList, "remove")
        );
    }
    secondExit(el: HTMLElement, elToWatch: Array<number>, i: number) {
        this.delIndex(elToWatch, i);
        if (el.attributes.getNamedItem(this.prefix + "OU") === null)
            this.isCustomAnimation(
                el.attributes.getNamedItem(this.name)!.value,
                () => this.setClass(el.attributes, el.classList, "remove")
            );
    }
}
new betterScrollAnimation();
new betterScrollAnimation({
    elToScroll: document.querySelector<HTMLElement>(
        ".horizontal-scroll-wrapper"
    )!,
    prefix: "x-",
    name: "scroll-x",
});
