import { HexGrid, HexCell, HexDirection } from '../helpers/hexgrid/index'
import { IPathFindingStrategy } from '../helpers/a-star'
import { TerrainType, TerrainCell } from './game'

export class TerrainPathFindingStrategy implements IPathFindingStrategy<HexCell<TerrainCell>> {
    private directions: HexDirection[] = [
        HexDirection.N,
        HexDirection.NE,
        HexDirection.NW,
        HexDirection.S,
        HexDirection.SE,
        HexDirection.SW,
    ];

    constructor(private grid: HexGrid<TerrainCell>) {
    }

    areWeThereYet(currentNode: HexCell<TerrainCell>, finishNode: HexCell<TerrainCell>): boolean {
        return currentNode.cellIndex == finishNode.cellIndex;
    }

    iterateOverNeighbors(currentCell: HexCell<TerrainCell>, func: (neighborCell: HexCell<TerrainCell>, G: number) => void): void {
        for (let i = 0; i < this.directions.length; ++i) {
            let neighbor = this.grid.getNeighbor(currentCell, this.directions[i]);
            if (!neighbor) {
                continue;
            }

            // check the terrain type and assign different value
            let G: number;
            switch (neighbor.value.terrainType) {
                case TerrainType.Desert:
                    G = 25;
                    break;
                case TerrainType.Tree:
                    G = 15;
                    break;
                case TerrainType.Mountain:
                    G = 100;
                    break;
                case TerrainType.Water:
                    continue;   //can't swim or fly across water yet
                case TerrainType.Grass:
                default:
                    G = 10;
                    break;
            }

            func(neighbor, G);
        }
    }

    getHeuristic(c1: HexCell<TerrainCell>, c2: HexCell<TerrainCell>): number {
        let dy = c1.row - c2.row;
        let dx = c1.col - c2.col;
        return Math.sqrt(dx * dx + dy * dy) * 10;
        //return 1;
    }
} 