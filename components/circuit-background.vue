<template>
  <div class="fixed -z-10 inset-0" ref="p5Canvas">
  </div>
</template>

<script lang="ts" setup>
import { CircuitCellDrawer, CircuitCellGrid, Vector2 } from '~/src/circuit_draw';
import type p5 from "p5"

const { $p5 } = useNuxtApp();
const cellSizeGrid = ref(30);
const circuitWidthPercent = ref(0.1);
const p5Canvas: Ref<HTMLElement | undefined> = ref();
const cellGrid: CircuitCellGrid = new CircuitCellGrid();
const cellDrawer: CircuitCellDrawer = new CircuitCellDrawer();
const collapseJointType = ref(3);

// cellDrawer.debugJoint = false;

let lastGenerateDuration: number = 0;

function hasDarkClass() {
  return document.body.classList.contains("dark");
}

function getCellSize(screenSize: Vector2, divider = 20) {
  const minSize = Math.min(screenSize.x, screenSize.y);
  return minSize / divider;
}

function calcuateCellBound(screenSize: Vector2, cellSize: number) {
  const minX = 0;
  const maxX = Math.ceil(screenSize.x / cellSize);
  const minY = 0;
  const maxY = Math.ceil(screenSize.y / cellSize);
  return { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } }
}

const generateDelay = 100;

onMounted(() => {
  new $p5((p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(p5Canvas.value!.clientWidth, p5Canvas.value!.clientHeight);
    }

    p5.draw = () => {
      lastGenerateDuration += p5.deltaTime;
      const screenSize = new Vector2(p5.width, p5.height);
      const cellSize = getCellSize(screenSize, cellSizeGrid.value);
      const cellBound = calcuateCellBound(screenSize, cellSize);

      if (lastGenerateDuration >= generateDelay) {
        // calculate bound
        const nextCellPosition = cellGrid.scanNextCellPosition(cellBound.x.max, cellBound.y.max);

        if (nextCellPosition) {
          const newCell = cellGrid.getNewCellWithJoint(nextCellPosition);
          newCell.collapseJoint(collapseJointType.value);
          cellGrid.addCell(nextCellPosition, newCell);
        }

        lastGenerateDuration = lastGenerateDuration % generateDelay;
      }

      const isDark = hasDarkClass();

      p5.background(isDark ? "#343335" : "#e8f2ea");

      cellDrawer.backgroundColor = isDark ? "#343335" : "#e8f2ea";
      cellDrawer.circuitColor = isDark ? "#617c64" : "#b5d9a4";
      cellDrawer.jointSize = circuitWidthPercent.value;
      const drawQueue: ({ z: number, f: () => void })[] = [];
      for (let r = cellBound.y.min; r <= cellBound.y.max; r++) {
        for (let c = cellBound.x.min; c <= cellBound.x.max; c++) {
          const cellData = cellGrid.getCellData(new Vector2(c, r));
          if (typeof cellData !== "undefined") {
            drawQueue.push(...cellDrawer.getDrawFn(p5, screenSize, cellSize, cellGrid, new Vector2(c, r)));
          }
        }
      }

      drawQueue.sort((a, b) => a.z - b.z);
      for (const ele of drawQueue) {
        ele.f();
      }
    }

    p5.windowResized = (ev) => {
      p5.resizeCanvas(p5Canvas.value!.clientWidth, p5Canvas.value!.clientHeight);
    }
  }, p5Canvas.value);
});
</script>

<style scoped></style>
