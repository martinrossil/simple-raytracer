/**
 * const canv = document.createElement('canvas');
            canv.width = 768;
            canv.height = 768;
        // canv.style.transform = 'scale(2)';
        this.appendChild(canv);
        const ctx = canv.getContext('2d');
        const rayTracer = new RayTracer();
        rayTracer.render(new DefaultScene(), ctx, 768, 768);
        const took = performance.now() - start;
        console.log('took', took, 'ms');
 */