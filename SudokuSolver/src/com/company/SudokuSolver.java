package com.company;

import java.util.Arrays;

public class SudokuSolver {
    public static void main(String[] args) {
        int[][] arr = {{3,0,6,5,0,8,4,0,0},
                {5,2,0,0,0,0,0,0,0},
                {0,8,7,0,0,0,0,3,1},
                {0,0,3,0,1,0,0,8,0},
                {9,0,0,8,6,3,0,0,5},
                {0,5,0,0,9,0,6,0,0},
                {1,3,0,0,0,0,2,5,0},
                {0,0,0,0,0,0,0,7,4},
                {0,0,5,2,0,6,3,0,0}};
        solveSudoko(arr,0,0);
    }
    public static void display(int[][] arr){
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[0].length; j++) {
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
    public static void solveSudoko(int[][] arr, int i, int j){
        if(i == arr.length){
            display(arr);
            return;
        }

        int ni = 0;
        int nj = 0;
        if(j == arr[0].length - 1){
            ni = i+1;
            nj = 0;
        }else{
            ni = i;
            nj = j+1;
        }

        if(arr[i][j] != 0){
            solveSudoko(arr, ni, nj);
        }else{
            for (int po = 1; po <= 9 ; po++) {
                if(isValid(arr, i, j, po) == true){
                    arr[i][j] = po;
                    solveSudoko(arr,ni,nj);
                    arr[i][j] = 0;
                }
            }
        }
    }

    public static boolean isValid(int[][] arr, int x, int y,int val){
        for (int j = 0; j < arr[0].length; j++) {
            if(arr[x][j] == val){
                return false;
            }
        }

        for (int i = 0; i < arr.length; i++) {
            if(arr[i][y] == val){
                return false;
            }
        }

        int smi = x/3 * 3;
        int smj = y/3 * 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if(arr[smi + i][smj +j] == val){
                    return false;
                }
            }
        }
        return true;
    }
}
