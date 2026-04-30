// Mapa de acordes generado mediante análisis de audio (Librosa)
// Las notas están sincronizadas con los picos de volumen de tu canción.

/**
 * Filtra el song map según la dificultad seleccionada.
 * - 'easy':   una nota cada ~1.5 s (aprox. 25% del total)
 * - 'medium': una nota cada ~0.7 s (aprox. 50% del total)
 * - 'hard':   todas las notas (comportamiento original)
 */
export function filterByDifficulty(map, difficulty = 'hard') {
  if (difficulty === 'hard') return map;

  const minGap = difficulty === 'easy' ? 1.5 : 0.7;
  const filtered = [];
  let lastTime = -Infinity;

  for (const note of map) {
    if (note.targetTime - lastTime >= minGap) {
      filtered.push(note);
      lastTime = note.targetTime;
    }
  }
  return filtered;
}

export const generatedSongMap = [
  {
    "lane": 2,
    "targetTime": 1.02
  },
  {
    "lane": 0,
    "targetTime": 1.02
  },
  {
    "lane": 2,
    "targetTime": 1.42
  },
  {
    "lane": 2,
    "targetTime": 1.9
  },
  {
    "lane": 2,
    "targetTime": 2.28
  },
  {
    "lane": 2,
    "targetTime": 2.53
  },
  {
    "lane": 0,
    "targetTime": 2.53
  },
  {
    "lane": 2,
    "targetTime": 3.02
  },
  {
    "lane": 0,
    "targetTime": 3.02
  },
  {
    "lane": 2,
    "targetTime": 3.39
  },
  {
    "lane": 2,
    "targetTime": 3.65
  },
  {
    "lane": 0,
    "targetTime": 3.65
  },
  {
    "lane": 2,
    "targetTime": 3.9
  },
  {
    "lane": 0,
    "targetTime": 3.9
  },
  {
    "lane": 2,
    "targetTime": 4.16
  },
  {
    "lane": 0,
    "targetTime": 4.16
  },
  {
    "lane": 2,
    "targetTime": 4.53
  },
  {
    "lane": 2,
    "targetTime": 5.02
  },
  {
    "lane": 0,
    "targetTime": 5.02
  },
  {
    "lane": 2,
    "targetTime": 5.64
  },
  {
    "lane": 0,
    "targetTime": 5.64
  },
  {
    "lane": 2,
    "targetTime": 6.15
  },
  {
    "lane": 0,
    "targetTime": 6.15
  },
  {
    "lane": 2,
    "targetTime": 6.52
  },
  {
    "lane": 0,
    "targetTime": 6.52
  },
  {
    "lane": 2,
    "targetTime": 7.01
  },
  {
    "lane": 0,
    "targetTime": 7.01
  },
  {
    "lane": 2,
    "targetTime": 7.5
  },
  {
    "lane": 2,
    "targetTime": 7.89
  },
  {
    "lane": 0,
    "targetTime": 7.89
  },
  {
    "lane": 2,
    "targetTime": 8.15
  },
  {
    "lane": 0,
    "targetTime": 8.15
  },
  {
    "lane": 2,
    "targetTime": 8.52
  },
  {
    "lane": 2,
    "targetTime": 8.78
  },
  {
    "lane": 3,
    "targetTime": 9.15
  },
  {
    "lane": 1,
    "targetTime": 9.15
  },
  {
    "lane": 2,
    "targetTime": 9.64
  },
  {
    "lane": 0,
    "targetTime": 9.64
  },
  {
    "lane": 2,
    "targetTime": 10.15
  },
  {
    "lane": 0,
    "targetTime": 10.15
  },
  {
    "lane": 2,
    "targetTime": 10.52
  },
  {
    "lane": 2,
    "targetTime": 11.01
  },
  {
    "lane": 2,
    "targetTime": 11.38
  },
  {
    "lane": 2,
    "targetTime": 11.63
  },
  {
    "lane": 0,
    "targetTime": 11.63
  },
  {
    "lane": 2,
    "targetTime": 11.89
  },
  {
    "lane": 0,
    "targetTime": 11.89
  },
  {
    "lane": 2,
    "targetTime": 12.14
  },
  {
    "lane": 0,
    "targetTime": 12.14
  },
  {
    "lane": 2,
    "targetTime": 12.52
  },
  {
    "lane": 2,
    "targetTime": 13.0
  },
  {
    "lane": 2,
    "targetTime": 13.63
  },
  {
    "lane": 0,
    "targetTime": 13.63
  },
  {
    "lane": 2,
    "targetTime": 13.89
  },
  {
    "lane": 0,
    "targetTime": 13.89
  },
  {
    "lane": 2,
    "targetTime": 14.14
  },
  {
    "lane": 2,
    "targetTime": 14.51
  },
  {
    "lane": 0,
    "targetTime": 14.51
  },
  {
    "lane": 2,
    "targetTime": 14.77
  },
  {
    "lane": 2,
    "targetTime": 15.12
  },
  {
    "lane": 0,
    "targetTime": 15.12
  },
  {
    "lane": 2,
    "targetTime": 15.46
  },
  {
    "lane": 2,
    "targetTime": 15.88
  },
  {
    "lane": 0,
    "targetTime": 15.88
  },
  {
    "lane": 1,
    "targetTime": 16.46
  },
  {
    "lane": 3,
    "targetTime": 16.46
  },
  {
    "lane": 2,
    "targetTime": 17.16
  },
  {
    "lane": 2,
    "targetTime": 17.51
  },
  {
    "lane": 0,
    "targetTime": 17.51
  },
  {
    "lane": 2,
    "targetTime": 18.0
  },
  {
    "lane": 0,
    "targetTime": 18.0
  },
  {
    "lane": 2,
    "targetTime": 18.25
  },
  {
    "lane": 0,
    "targetTime": 18.25
  },
  {
    "lane": 2,
    "targetTime": 18.62
  },
  {
    "lane": 0,
    "targetTime": 18.62
  },
  {
    "lane": 2,
    "targetTime": 19.25
  },
  {
    "lane": 2,
    "targetTime": 19.62
  },
  {
    "lane": 0,
    "targetTime": 19.62
  },
  {
    "lane": 2,
    "targetTime": 19.99
  },
  {
    "lane": 0,
    "targetTime": 19.99
  },
  {
    "lane": 2,
    "targetTime": 20.36
  },
  {
    "lane": 0,
    "targetTime": 20.36
  },
  {
    "lane": 2,
    "targetTime": 20.62
  },
  {
    "lane": 2,
    "targetTime": 21.13
  },
  {
    "lane": 2,
    "targetTime": 21.48
  },
  {
    "lane": 2,
    "targetTime": 21.99
  },
  {
    "lane": 2,
    "targetTime": 22.45
  },
  {
    "lane": 2,
    "targetTime": 22.71
  },
  {
    "lane": 2,
    "targetTime": 22.99
  },
  {
    "lane": 2,
    "targetTime": 23.36
  },
  {
    "lane": 2,
    "targetTime": 23.71
  },
  {
    "lane": 2,
    "targetTime": 23.96
  },
  {
    "lane": 2,
    "targetTime": 24.33
  },
  {
    "lane": 2,
    "targetTime": 24.59
  },
  {
    "lane": 2,
    "targetTime": 25.12
  },
  {
    "lane": 2,
    "targetTime": 25.45
  },
  {
    "lane": 2,
    "targetTime": 25.7
  },
  {
    "lane": 2,
    "targetTime": 25.96
  },
  {
    "lane": 2,
    "targetTime": 26.22
  },
  {
    "lane": 2,
    "targetTime": 26.59
  },
  {
    "lane": 0,
    "targetTime": 26.59
  },
  {
    "lane": 2,
    "targetTime": 27.1
  },
  {
    "lane": 2,
    "targetTime": 27.45
  },
  {
    "lane": 2,
    "targetTime": 27.96
  },
  {
    "lane": 2,
    "targetTime": 28.33
  },
  {
    "lane": 0,
    "targetTime": 28.33
  },
  {
    "lane": 2,
    "targetTime": 28.58
  },
  {
    "lane": 2,
    "targetTime": 29.09
  },
  {
    "lane": 2,
    "targetTime": 29.44
  },
  {
    "lane": 2,
    "targetTime": 29.7
  },
  {
    "lane": 2,
    "targetTime": 30.05
  },
  {
    "lane": 0,
    "targetTime": 30.05
  },
  {
    "lane": 2,
    "targetTime": 30.56
  },
  {
    "lane": 0,
    "targetTime": 30.56
  },
  {
    "lane": 2,
    "targetTime": 30.93
  },
  {
    "lane": 0,
    "targetTime": 30.93
  },
  {
    "lane": 2,
    "targetTime": 31.3
  },
  {
    "lane": 0,
    "targetTime": 31.3
  },
  {
    "lane": 2,
    "targetTime": 31.56
  },
  {
    "lane": 0,
    "targetTime": 31.56
  },
  {
    "lane": 3,
    "targetTime": 31.9
  },
  {
    "lane": 1,
    "targetTime": 31.9
  },
  {
    "lane": 1,
    "targetTime": 32.18
  },
  {
    "lane": 3,
    "targetTime": 32.18
  },
  {
    "lane": 2,
    "targetTime": 32.55
  },
  {
    "lane": 0,
    "targetTime": 32.55
  },
  {
    "lane": 2,
    "targetTime": 32.81
  },
  {
    "lane": 2,
    "targetTime": 33.07
  },
  {
    "lane": 0,
    "targetTime": 33.07
  },
  {
    "lane": 2,
    "targetTime": 33.44
  },
  {
    "lane": 0,
    "targetTime": 33.44
  },
  {
    "lane": 2,
    "targetTime": 33.81
  },
  {
    "lane": 0,
    "targetTime": 33.81
  },
  {
    "lane": 1,
    "targetTime": 34.18
  },
  {
    "lane": 3,
    "targetTime": 34.18
  },
  {
    "lane": 2,
    "targetTime": 34.55
  },
  {
    "lane": 0,
    "targetTime": 34.55
  },
  {
    "lane": 3,
    "targetTime": 34.92
  },
  {
    "lane": 1,
    "targetTime": 34.92
  },
  {
    "lane": 3,
    "targetTime": 35.2
  },
  {
    "lane": 2,
    "targetTime": 35.55
  },
  {
    "lane": 0,
    "targetTime": 35.55
  },
  {
    "lane": 2,
    "targetTime": 35.81
  },
  {
    "lane": 2,
    "targetTime": 36.06
  },
  {
    "lane": 0,
    "targetTime": 36.06
  },
  {
    "lane": 2,
    "targetTime": 36.32
  },
  {
    "lane": 2,
    "targetTime": 36.8
  },
  {
    "lane": 2,
    "targetTime": 37.06
  },
  {
    "lane": 0,
    "targetTime": 37.06
  },
  {
    "lane": 2,
    "targetTime": 37.43
  },
  {
    "lane": 0,
    "targetTime": 37.43
  },
  {
    "lane": 2,
    "targetTime": 37.8
  },
  {
    "lane": 2,
    "targetTime": 38.17
  },
  {
    "lane": 0,
    "targetTime": 38.17
  },
  {
    "lane": 2,
    "targetTime": 38.55
  },
  {
    "lane": 0,
    "targetTime": 38.55
  },
  {
    "lane": 2,
    "targetTime": 38.8
  },
  {
    "lane": 2,
    "targetTime": 39.15
  },
  {
    "lane": 1,
    "targetTime": 39.43
  },
  {
    "lane": 3,
    "targetTime": 39.43
  },
  {
    "lane": 2,
    "targetTime": 39.68
  },
  {
    "lane": 2,
    "targetTime": 40.05
  },
  {
    "lane": 0,
    "targetTime": 40.05
  },
  {
    "lane": 2,
    "targetTime": 40.54
  },
  {
    "lane": 0,
    "targetTime": 40.54
  },
  {
    "lane": 2,
    "targetTime": 40.91
  },
  {
    "lane": 2,
    "targetTime": 41.17
  },
  {
    "lane": 2,
    "targetTime": 41.42
  },
  {
    "lane": 2,
    "targetTime": 41.8
  },
  {
    "lane": 0,
    "targetTime": 41.8
  },
  {
    "lane": 2,
    "targetTime": 42.05
  },
  {
    "lane": 0,
    "targetTime": 42.05
  },
  {
    "lane": 2,
    "targetTime": 42.54
  },
  {
    "lane": 0,
    "targetTime": 42.54
  },
  {
    "lane": 2,
    "targetTime": 42.91
  },
  {
    "lane": 0,
    "targetTime": 42.91
  },
  {
    "lane": 3,
    "targetTime": 43.17
  },
  {
    "lane": 3,
    "targetTime": 43.42
  },
  {
    "lane": 1,
    "targetTime": 43.42
  },
  {
    "lane": 2,
    "targetTime": 43.68
  },
  {
    "lane": 2,
    "targetTime": 44.05
  },
  {
    "lane": 0,
    "targetTime": 44.05
  },
  {
    "lane": 2,
    "targetTime": 44.42
  },
  {
    "lane": 0,
    "targetTime": 44.42
  },
  {
    "lane": 2,
    "targetTime": 44.91
  },
  {
    "lane": 0,
    "targetTime": 44.91
  },
  {
    "lane": 2,
    "targetTime": 45.28
  },
  {
    "lane": 0,
    "targetTime": 45.28
  },
  {
    "lane": 2,
    "targetTime": 45.53
  },
  {
    "lane": 0,
    "targetTime": 45.53
  },
  {
    "lane": 2,
    "targetTime": 45.79
  },
  {
    "lane": 0,
    "targetTime": 45.79
  },
  {
    "lane": 3,
    "targetTime": 46.05
  },
  {
    "lane": 1,
    "targetTime": 46.05
  },
  {
    "lane": 2,
    "targetTime": 46.3
  },
  {
    "lane": 0,
    "targetTime": 46.3
  },
  {
    "lane": 2,
    "targetTime": 46.93
  },
  {
    "lane": 2,
    "targetTime": 47.28
  },
  {
    "lane": 0,
    "targetTime": 47.28
  },
  {
    "lane": 2,
    "targetTime": 47.53
  },
  {
    "lane": 0,
    "targetTime": 47.53
  },
  {
    "lane": 2,
    "targetTime": 47.79
  },
  {
    "lane": 2,
    "targetTime": 48.04
  },
  {
    "lane": 0,
    "targetTime": 48.04
  },
  {
    "lane": 2,
    "targetTime": 48.3
  },
  {
    "lane": 2,
    "targetTime": 48.55
  },
  {
    "lane": 0,
    "targetTime": 48.55
  },
  {
    "lane": 2,
    "targetTime": 48.92
  },
  {
    "lane": 2,
    "targetTime": 49.27
  },
  {
    "lane": 2,
    "targetTime": 49.53
  },
  {
    "lane": 0,
    "targetTime": 49.53
  },
  {
    "lane": 2,
    "targetTime": 50.04
  },
  {
    "lane": 0,
    "targetTime": 50.04
  },
  {
    "lane": 2,
    "targetTime": 50.29
  },
  {
    "lane": 2,
    "targetTime": 50.67
  },
  {
    "lane": 2,
    "targetTime": 51.04
  },
  {
    "lane": 2,
    "targetTime": 51.29
  },
  {
    "lane": 0,
    "targetTime": 51.29
  },
  {
    "lane": 2,
    "targetTime": 51.78
  },
  {
    "lane": 2,
    "targetTime": 52.29
  },
  {
    "lane": 2,
    "targetTime": 52.55
  },
  {
    "lane": 0,
    "targetTime": 52.55
  },
  {
    "lane": 2,
    "targetTime": 52.9
  },
  {
    "lane": 0,
    "targetTime": 52.9
  },
  {
    "lane": 2,
    "targetTime": 53.29
  },
  {
    "lane": 0,
    "targetTime": 53.29
  },
  {
    "lane": 2,
    "targetTime": 53.92
  },
  {
    "lane": 0,
    "targetTime": 53.92
  },
  {
    "lane": 2,
    "targetTime": 54.54
  },
  {
    "lane": 0,
    "targetTime": 54.54
  },
  {
    "lane": 2,
    "targetTime": 54.8
  },
  {
    "lane": 2,
    "targetTime": 55.17
  },
  {
    "lane": 2,
    "targetTime": 55.52
  },
  {
    "lane": 0,
    "targetTime": 55.52
  },
  {
    "lane": 3,
    "targetTime": 56.05
  },
  {
    "lane": 1,
    "targetTime": 56.05
  },
  {
    "lane": 2,
    "targetTime": 56.54
  },
  {
    "lane": 0,
    "targetTime": 56.54
  },
  {
    "lane": 2,
    "targetTime": 56.91
  },
  {
    "lane": 2,
    "targetTime": 57.28
  },
  {
    "lane": 2,
    "targetTime": 57.54
  },
  {
    "lane": 0,
    "targetTime": 57.54
  },
  {
    "lane": 2,
    "targetTime": 58.03
  },
  {
    "lane": 0,
    "targetTime": 58.03
  },
  {
    "lane": 2,
    "targetTime": 58.28
  },
  {
    "lane": 2,
    "targetTime": 58.54
  },
  {
    "lane": 2,
    "targetTime": 58.91
  },
  {
    "lane": 2,
    "targetTime": 59.28
  },
  {
    "lane": 2,
    "targetTime": 59.68
  },
  {
    "lane": 2,
    "targetTime": 59.93
  },
  {
    "lane": 2,
    "targetTime": 60.26
  },
  {
    "lane": 2,
    "targetTime": 60.63
  },
  {
    "lane": 2,
    "targetTime": 61.0
  },
  {
    "lane": 2,
    "targetTime": 61.25
  },
  {
    "lane": 0,
    "targetTime": 61.25
  },
  {
    "lane": 2,
    "targetTime": 61.6
  },
  {
    "lane": 2,
    "targetTime": 61.97
  },
  {
    "lane": 2,
    "targetTime": 62.25
  },
  {
    "lane": 0,
    "targetTime": 62.25
  },
  {
    "lane": 2,
    "targetTime": 62.62
  },
  {
    "lane": 2,
    "targetTime": 63.0
  },
  {
    "lane": 0,
    "targetTime": 63.0
  },
  {
    "lane": 2,
    "targetTime": 63.25
  },
  {
    "lane": 2,
    "targetTime": 63.74
  },
  {
    "lane": 2,
    "targetTime": 63.99
  },
  {
    "lane": 2,
    "targetTime": 64.25
  },
  {
    "lane": 2,
    "targetTime": 64.62
  },
  {
    "lane": 2,
    "targetTime": 64.99
  },
  {
    "lane": 0,
    "targetTime": 64.99
  },
  {
    "lane": 2,
    "targetTime": 65.25
  },
  {
    "lane": 0,
    "targetTime": 65.25
  },
  {
    "lane": 2,
    "targetTime": 65.74
  },
  {
    "lane": 2,
    "targetTime": 65.99
  },
  {
    "lane": 2,
    "targetTime": 66.25
  },
  {
    "lane": 2,
    "targetTime": 66.62
  },
  {
    "lane": 0,
    "targetTime": 66.62
  },
  {
    "lane": 2,
    "targetTime": 66.99
  },
  {
    "lane": 2,
    "targetTime": 67.24
  },
  {
    "lane": 0,
    "targetTime": 67.24
  },
  {
    "lane": 2,
    "targetTime": 67.5
  },
  {
    "lane": 2,
    "targetTime": 67.87
  },
  {
    "lane": 2,
    "targetTime": 68.24
  },
  {
    "lane": 0,
    "targetTime": 68.24
  },
  {
    "lane": 2,
    "targetTime": 68.61
  },
  {
    "lane": 2,
    "targetTime": 68.99
  },
  {
    "lane": 2,
    "targetTime": 69.24
  },
  {
    "lane": 0,
    "targetTime": 69.24
  },
  {
    "lane": 2,
    "targetTime": 69.73
  },
  {
    "lane": 0,
    "targetTime": 69.73
  },
  {
    "lane": 3,
    "targetTime": 70.12
  },
  {
    "lane": 2,
    "targetTime": 70.61
  },
  {
    "lane": 0,
    "targetTime": 70.61
  },
  {
    "lane": 2,
    "targetTime": 70.98
  },
  {
    "lane": 2,
    "targetTime": 71.24
  },
  {
    "lane": 0,
    "targetTime": 71.24
  },
  {
    "lane": 2,
    "targetTime": 71.59
  },
  {
    "lane": 2,
    "targetTime": 72.24
  },
  {
    "lane": 2,
    "targetTime": 72.75
  },
  {
    "lane": 2,
    "targetTime": 73.24
  },
  {
    "lane": 0,
    "targetTime": 73.24
  },
  {
    "lane": 2,
    "targetTime": 73.7
  },
  {
    "lane": 2,
    "targetTime": 73.96
  },
  {
    "lane": 2,
    "targetTime": 74.23
  },
  {
    "lane": 2,
    "targetTime": 74.61
  },
  {
    "lane": 2,
    "targetTime": 74.98
  },
  {
    "lane": 0,
    "targetTime": 74.98
  },
  {
    "lane": 2,
    "targetTime": 75.23
  },
  {
    "lane": 0,
    "targetTime": 75.23
  },
  {
    "lane": 2,
    "targetTime": 75.49
  },
  {
    "lane": 2,
    "targetTime": 75.98
  },
  {
    "lane": 2,
    "targetTime": 76.23
  },
  {
    "lane": 2,
    "targetTime": 76.79
  },
  {
    "lane": 2,
    "targetTime": 79.16
  },
  {
    "lane": 1,
    "targetTime": 79.48
  },
  {
    "lane": 2,
    "targetTime": 79.78
  },
  {
    "lane": 2,
    "targetTime": 80.16
  },
  {
    "lane": 0,
    "targetTime": 80.16
  },
  {
    "lane": 2,
    "targetTime": 80.41
  },
  {
    "lane": 2,
    "targetTime": 80.9
  },
  {
    "lane": 0,
    "targetTime": 80.9
  },
  {
    "lane": 2,
    "targetTime": 81.15
  },
  {
    "lane": 0,
    "targetTime": 81.15
  },
  {
    "lane": 2,
    "targetTime": 81.41
  },
  {
    "lane": 2,
    "targetTime": 81.66
  },
  {
    "lane": 0,
    "targetTime": 81.66
  },
  {
    "lane": 2,
    "targetTime": 82.15
  },
  {
    "lane": 0,
    "targetTime": 82.15
  },
  {
    "lane": 2,
    "targetTime": 82.55
  },
  {
    "lane": 0,
    "targetTime": 82.55
  },
  {
    "lane": 2,
    "targetTime": 82.9
  },
  {
    "lane": 0,
    "targetTime": 82.9
  },
  {
    "lane": 2,
    "targetTime": 83.15
  },
  {
    "lane": 0,
    "targetTime": 83.15
  },
  {
    "lane": 2,
    "targetTime": 83.41
  },
  {
    "lane": 2,
    "targetTime": 83.66
  },
  {
    "lane": 2,
    "targetTime": 84.15
  },
  {
    "lane": 0,
    "targetTime": 84.15
  },
  {
    "lane": 2,
    "targetTime": 84.4
  },
  {
    "lane": 2,
    "targetTime": 84.66
  },
  {
    "lane": 0,
    "targetTime": 84.66
  },
  {
    "lane": 2,
    "targetTime": 85.03
  },
  {
    "lane": 2,
    "targetTime": 85.38
  },
  {
    "lane": 2,
    "targetTime": 85.66
  },
  {
    "lane": 0,
    "targetTime": 85.66
  },
  {
    "lane": 2,
    "targetTime": 86.15
  },
  {
    "lane": 0,
    "targetTime": 86.15
  },
  {
    "lane": 2,
    "targetTime": 86.52
  },
  {
    "lane": 0,
    "targetTime": 86.52
  },
  {
    "lane": 2,
    "targetTime": 86.87
  },
  {
    "lane": 0,
    "targetTime": 86.87
  },
  {
    "lane": 2,
    "targetTime": 87.14
  },
  {
    "lane": 0,
    "targetTime": 87.14
  },
  {
    "lane": 2,
    "targetTime": 87.4
  },
  {
    "lane": 2,
    "targetTime": 87.66
  },
  {
    "lane": 0,
    "targetTime": 87.66
  },
  {
    "lane": 2,
    "targetTime": 88.14
  },
  {
    "lane": 0,
    "targetTime": 88.14
  },
  {
    "lane": 2,
    "targetTime": 88.51
  },
  {
    "lane": 3,
    "targetTime": 88.77
  },
  {
    "lane": 2,
    "targetTime": 89.03
  },
  {
    "lane": 0,
    "targetTime": 89.03
  },
  {
    "lane": 2,
    "targetTime": 89.4
  },
  {
    "lane": 0,
    "targetTime": 89.4
  },
  {
    "lane": 2,
    "targetTime": 89.79
  },
  {
    "lane": 0,
    "targetTime": 89.79
  },
  {
    "lane": 2,
    "targetTime": 90.14
  },
  {
    "lane": 0,
    "targetTime": 90.14
  },
  {
    "lane": 2,
    "targetTime": 90.53
  },
  {
    "lane": 0,
    "targetTime": 90.53
  },
  {
    "lane": 2,
    "targetTime": 90.91
  },
  {
    "lane": 0,
    "targetTime": 90.91
  },
  {
    "lane": 2,
    "targetTime": 91.28
  },
  {
    "lane": 2,
    "targetTime": 91.65
  },
  {
    "lane": 2,
    "targetTime": 91.93
  },
  {
    "lane": 2,
    "targetTime": 92.39
  },
  {
    "lane": 0,
    "targetTime": 92.39
  },
  {
    "lane": 2,
    "targetTime": 92.9
  },
  {
    "lane": 0,
    "targetTime": 92.9
  },
  {
    "lane": 2,
    "targetTime": 93.39
  },
  {
    "lane": 0,
    "targetTime": 93.39
  },
  {
    "lane": 3,
    "targetTime": 93.67
  },
  {
    "lane": 1,
    "targetTime": 93.67
  },
  {
    "lane": 2,
    "targetTime": 94.13
  },
  {
    "lane": 0,
    "targetTime": 94.13
  },
  {
    "lane": 2,
    "targetTime": 94.53
  },
  {
    "lane": 0,
    "targetTime": 94.53
  },
  {
    "lane": 2,
    "targetTime": 94.88
  },
  {
    "lane": 0,
    "targetTime": 94.88
  },
  {
    "lane": 2,
    "targetTime": 95.16
  },
  {
    "lane": 0,
    "targetTime": 95.16
  },
  {
    "lane": 2,
    "targetTime": 95.41
  },
  {
    "lane": 2,
    "targetTime": 95.78
  },
  {
    "lane": 2,
    "targetTime": 96.04
  },
  {
    "lane": 2,
    "targetTime": 96.41
  },
  {
    "lane": 2,
    "targetTime": 96.66
  },
  {
    "lane": 2,
    "targetTime": 97.01
  },
  {
    "lane": 2,
    "targetTime": 97.66
  },
  {
    "lane": 2,
    "targetTime": 98.15
  },
  {
    "lane": 2,
    "targetTime": 98.52
  },
  {
    "lane": 2,
    "targetTime": 98.78
  },
  {
    "lane": 2,
    "targetTime": 99.15
  },
  {
    "lane": 0,
    "targetTime": 99.15
  },
  {
    "lane": 2,
    "targetTime": 99.4
  },
  {
    "lane": 2,
    "targetTime": 99.68
  },
  {
    "lane": 2,
    "targetTime": 100.15
  },
  {
    "lane": 0,
    "targetTime": 100.15
  },
  {
    "lane": 2,
    "targetTime": 100.4
  },
  {
    "lane": 2,
    "targetTime": 100.66
  },
  {
    "lane": 1,
    "targetTime": 101.03
  },
  {
    "lane": 3,
    "targetTime": 101.03
  },
  {
    "lane": 1,
    "targetTime": 101.52
  },
  {
    "lane": 3,
    "targetTime": 101.52
  },
  {
    "lane": 2,
    "targetTime": 101.77
  },
  {
    "lane": 0,
    "targetTime": 101.77
  },
  {
    "lane": 2,
    "targetTime": 102.14
  },
  {
    "lane": 2,
    "targetTime": 102.4
  },
  {
    "lane": 3,
    "targetTime": 102.68
  },
  {
    "lane": 2,
    "targetTime": 103.03
  },
  {
    "lane": 2,
    "targetTime": 103.28
  },
  {
    "lane": 2,
    "targetTime": 103.61
  },
  {
    "lane": 0,
    "targetTime": 103.61
  },
  {
    "lane": 2,
    "targetTime": 103.91
  },
  {
    "lane": 0,
    "targetTime": 103.91
  },
  {
    "lane": 2,
    "targetTime": 104.4
  },
  {
    "lane": 3,
    "targetTime": 104.79
  },
  {
    "lane": 2,
    "targetTime": 105.14
  },
  {
    "lane": 0,
    "targetTime": 105.14
  },
  {
    "lane": 2,
    "targetTime": 105.53
  },
  {
    "lane": 0,
    "targetTime": 105.53
  },
  {
    "lane": 3,
    "targetTime": 105.79
  },
  {
    "lane": 1,
    "targetTime": 105.79
  },
  {
    "lane": 2,
    "targetTime": 106.16
  },
  {
    "lane": 0,
    "targetTime": 106.16
  },
  {
    "lane": 2,
    "targetTime": 106.53
  },
  {
    "lane": 0,
    "targetTime": 106.53
  },
  {
    "lane": 2,
    "targetTime": 106.9
  },
  {
    "lane": 2,
    "targetTime": 107.16
  },
  {
    "lane": 0,
    "targetTime": 107.16
  },
  {
    "lane": 2,
    "targetTime": 107.67
  },
  {
    "lane": 2,
    "targetTime": 108.16
  },
  {
    "lane": 2,
    "targetTime": 108.53
  },
  {
    "lane": 2,
    "targetTime": 108.9
  },
  {
    "lane": 2,
    "targetTime": 109.16
  },
  {
    "lane": 0,
    "targetTime": 109.16
  },
  {
    "lane": 2,
    "targetTime": 109.41
  },
  {
    "lane": 2,
    "targetTime": 109.78
  },
  {
    "lane": 3,
    "targetTime": 110.04
  },
  {
    "lane": 2,
    "targetTime": 110.55
  },
  {
    "lane": 2,
    "targetTime": 110.92
  },
  {
    "lane": 2,
    "targetTime": 111.66
  },
  {
    "lane": 2,
    "targetTime": 112.15
  },
  {
    "lane": 0,
    "targetTime": 112.15
  },
  {
    "lane": 2,
    "targetTime": 112.92
  },
  {
    "lane": 2,
    "targetTime": 113.41
  },
  {
    "lane": 2,
    "targetTime": 113.66
  },
  {
    "lane": 2,
    "targetTime": 113.92
  },
  {
    "lane": 2,
    "targetTime": 114.43
  },
  {
    "lane": 2,
    "targetTime": 114.92
  },
  {
    "lane": 2,
    "targetTime": 115.66
  },
  {
    "lane": 0,
    "targetTime": 115.66
  },
  {
    "lane": 2,
    "targetTime": 115.91
  },
  {
    "lane": 2,
    "targetTime": 116.54
  },
  {
    "lane": 0,
    "targetTime": 116.54
  },
  {
    "lane": 2,
    "targetTime": 116.89
  },
  {
    "lane": 2,
    "targetTime": 117.14
  },
  {
    "lane": 0,
    "targetTime": 117.14
  },
  {
    "lane": 2,
    "targetTime": 117.4
  },
  {
    "lane": 2,
    "targetTime": 117.66
  },
  {
    "lane": 0,
    "targetTime": 117.66
  },
  {
    "lane": 2,
    "targetTime": 117.91
  },
  {
    "lane": 2,
    "targetTime": 118.17
  },
  {
    "lane": 2,
    "targetTime": 118.54
  },
  {
    "lane": 2,
    "targetTime": 118.91
  },
  {
    "lane": 2,
    "targetTime": 119.16
  },
  {
    "lane": 0,
    "targetTime": 119.16
  },
  {
    "lane": 2,
    "targetTime": 119.65
  },
  {
    "lane": 0,
    "targetTime": 119.65
  },
  {
    "lane": 3,
    "targetTime": 120.05
  },
  {
    "lane": 2,
    "targetTime": 120.53
  },
  {
    "lane": 0,
    "targetTime": 120.53
  },
  {
    "lane": 2,
    "targetTime": 121.14
  },
  {
    "lane": 0,
    "targetTime": 121.14
  },
  {
    "lane": 2,
    "targetTime": 121.53
  },
  {
    "lane": 2,
    "targetTime": 122.16
  },
  {
    "lane": 2,
    "targetTime": 122.69
  },
  {
    "lane": 2,
    "targetTime": 123.16
  },
  {
    "lane": 0,
    "targetTime": 123.16
  },
  {
    "lane": 2,
    "targetTime": 123.62
  },
  {
    "lane": 0,
    "targetTime": 123.62
  },
  {
    "lane": 2,
    "targetTime": 123.9
  },
  {
    "lane": 2,
    "targetTime": 124.16
  },
  {
    "lane": 2,
    "targetTime": 124.53
  },
  {
    "lane": 0,
    "targetTime": 124.53
  },
  {
    "lane": 2,
    "targetTime": 124.9
  },
  {
    "lane": 2,
    "targetTime": 125.16
  },
  {
    "lane": 0,
    "targetTime": 125.16
  },
  {
    "lane": 2,
    "targetTime": 125.64
  },
  {
    "lane": 2,
    "targetTime": 125.9
  },
  {
    "lane": 0,
    "targetTime": 125.9
  },
  {
    "lane": 2,
    "targetTime": 126.15
  },
  {
    "lane": 1,
    "targetTime": 130.15
  },
  {
    "lane": 1,
    "targetTime": 130.4
  },
  {
    "lane": 1,
    "targetTime": 130.89
  },
  {
    "lane": 3,
    "targetTime": 130.89
  },
  {
    "lane": 1,
    "targetTime": 131.15
  },
  {
    "lane": 3,
    "targetTime": 131.15
  },
  {
    "lane": 1,
    "targetTime": 131.66
  },
  {
    "lane": 1,
    "targetTime": 132.14
  },
  {
    "lane": 3,
    "targetTime": 132.14
  },
  {
    "lane": 1,
    "targetTime": 132.4
  },
  {
    "lane": 1,
    "targetTime": 132.66
  },
  {
    "lane": 3,
    "targetTime": 132.66
  },
  {
    "lane": 1,
    "targetTime": 133.14
  },
  {
    "lane": 3,
    "targetTime": 133.14
  },
  {
    "lane": 1,
    "targetTime": 133.63
  },
  {
    "lane": 3,
    "targetTime": 133.63
  },
  {
    "lane": 1,
    "targetTime": 133.89
  },
  {
    "lane": 3,
    "targetTime": 133.89
  },
  {
    "lane": 1,
    "targetTime": 134.37
  },
  {
    "lane": 3,
    "targetTime": 134.37
  },
  {
    "lane": 1,
    "targetTime": 134.63
  },
  {
    "lane": 3,
    "targetTime": 134.63
  },
  {
    "lane": 1,
    "targetTime": 134.88
  },
  {
    "lane": 3,
    "targetTime": 134.88
  },
  {
    "lane": 1,
    "targetTime": 135.14
  },
  {
    "lane": 3,
    "targetTime": 135.14
  },
  {
    "lane": 1,
    "targetTime": 135.4
  },
  {
    "lane": 1,
    "targetTime": 135.88
  },
  {
    "lane": 3,
    "targetTime": 135.88
  },
  {
    "lane": 1,
    "targetTime": 136.37
  },
  {
    "lane": 3,
    "targetTime": 136.37
  },
  {
    "lane": 1,
    "targetTime": 136.63
  },
  {
    "lane": 3,
    "targetTime": 136.63
  },
  {
    "lane": 1,
    "targetTime": 137.14
  },
  {
    "lane": 3,
    "targetTime": 137.14
  },
  {
    "lane": 1,
    "targetTime": 137.62
  },
  {
    "lane": 3,
    "targetTime": 137.62
  },
  {
    "lane": 1,
    "targetTime": 137.88
  },
  {
    "lane": 3,
    "targetTime": 137.88
  },
  {
    "lane": 1,
    "targetTime": 138.14
  },
  {
    "lane": 3,
    "targetTime": 138.14
  },
  {
    "lane": 1,
    "targetTime": 138.39
  },
  {
    "lane": 3,
    "targetTime": 138.39
  },
  {
    "lane": 2,
    "targetTime": 138.86
  },
  {
    "lane": 1,
    "targetTime": 139.13
  },
  {
    "lane": 3,
    "targetTime": 139.13
  },
  {
    "lane": 1,
    "targetTime": 139.39
  },
  {
    "lane": 3,
    "targetTime": 139.74
  },
  {
    "lane": 1,
    "targetTime": 140.13
  },
  {
    "lane": 1,
    "targetTime": 140.39
  },
  {
    "lane": 1,
    "targetTime": 140.88
  },
  {
    "lane": 3,
    "targetTime": 140.88
  },
  {
    "lane": 1,
    "targetTime": 141.13
  },
  {
    "lane": 3,
    "targetTime": 141.13
  },
  {
    "lane": 1,
    "targetTime": 141.39
  },
  {
    "lane": 1,
    "targetTime": 141.87
  },
  {
    "lane": 1,
    "targetTime": 142.25
  },
  {
    "lane": 1,
    "targetTime": 142.62
  },
  {
    "lane": 3,
    "targetTime": 142.62
  },
  {
    "lane": 1,
    "targetTime": 142.87
  },
  {
    "lane": 3,
    "targetTime": 142.87
  },
  {
    "lane": 1,
    "targetTime": 143.13
  },
  {
    "lane": 3,
    "targetTime": 143.13
  },
  {
    "lane": 1,
    "targetTime": 143.38
  },
  {
    "lane": 1,
    "targetTime": 143.89
  },
  {
    "lane": 1,
    "targetTime": 144.36
  },
  {
    "lane": 3,
    "targetTime": 144.36
  },
  {
    "lane": 1,
    "targetTime": 144.82
  },
  {
    "lane": 3,
    "targetTime": 144.82
  },
  {
    "lane": 1,
    "targetTime": 145.31
  },
  {
    "lane": 1,
    "targetTime": 145.59
  },
  {
    "lane": 2,
    "targetTime": 146.01
  },
  {
    "lane": 0,
    "targetTime": 146.01
  },
  {
    "lane": 2,
    "targetTime": 146.29
  },
  {
    "lane": 0,
    "targetTime": 146.29
  },
  {
    "lane": 2,
    "targetTime": 146.77
  },
  {
    "lane": 0,
    "targetTime": 146.77
  },
  {
    "lane": 2,
    "targetTime": 147.03
  },
  {
    "lane": 0,
    "targetTime": 147.03
  },
  {
    "lane": 2,
    "targetTime": 147.52
  },
  {
    "lane": 0,
    "targetTime": 147.52
  },
  {
    "lane": 2,
    "targetTime": 147.77
  },
  {
    "lane": 2,
    "targetTime": 148.03
  },
  {
    "lane": 0,
    "targetTime": 148.03
  },
  {
    "lane": 2,
    "targetTime": 148.28
  },
  {
    "lane": 2,
    "targetTime": 148.77
  },
  {
    "lane": 0,
    "targetTime": 148.77
  },
  {
    "lane": 2,
    "targetTime": 149.03
  },
  {
    "lane": 0,
    "targetTime": 149.03
  },
  {
    "lane": 2,
    "targetTime": 149.51
  },
  {
    "lane": 0,
    "targetTime": 149.51
  },
  {
    "lane": 2,
    "targetTime": 149.77
  },
  {
    "lane": 2,
    "targetTime": 150.02
  },
  {
    "lane": 0,
    "targetTime": 150.02
  },
  {
    "lane": 2,
    "targetTime": 150.51
  },
  {
    "lane": 0,
    "targetTime": 150.51
  },
  {
    "lane": 2,
    "targetTime": 150.77
  },
  {
    "lane": 0,
    "targetTime": 150.77
  },
  {
    "lane": 2,
    "targetTime": 151.02
  },
  {
    "lane": 0,
    "targetTime": 151.02
  },
  {
    "lane": 2,
    "targetTime": 151.28
  },
  {
    "lane": 0,
    "targetTime": 151.28
  },
  {
    "lane": 2,
    "targetTime": 151.77
  },
  {
    "lane": 0,
    "targetTime": 151.77
  },
  {
    "lane": 2,
    "targetTime": 152.02
  },
  {
    "lane": 0,
    "targetTime": 152.02
  },
  {
    "lane": 2,
    "targetTime": 152.28
  },
  {
    "lane": 0,
    "targetTime": 152.28
  },
  {
    "lane": 2,
    "targetTime": 152.76
  },
  {
    "lane": 0,
    "targetTime": 152.76
  },
  {
    "lane": 2,
    "targetTime": 153.02
  },
  {
    "lane": 0,
    "targetTime": 153.02
  },
  {
    "lane": 2,
    "targetTime": 153.27
  },
  {
    "lane": 2,
    "targetTime": 153.76
  },
  {
    "lane": 0,
    "targetTime": 153.76
  },
  {
    "lane": 2,
    "targetTime": 154.02
  },
  {
    "lane": 2,
    "targetTime": 154.51
  },
  {
    "lane": 0,
    "targetTime": 154.51
  },
  {
    "lane": 2,
    "targetTime": 154.76
  },
  {
    "lane": 2,
    "targetTime": 155.02
  },
  {
    "lane": 2,
    "targetTime": 155.27
  },
  {
    "lane": 2,
    "targetTime": 155.76
  },
  {
    "lane": 2,
    "targetTime": 156.01
  },
  {
    "lane": 0,
    "targetTime": 156.01
  },
  {
    "lane": 2,
    "targetTime": 156.5
  },
  {
    "lane": 0,
    "targetTime": 156.5
  },
  {
    "lane": 2,
    "targetTime": 156.76
  },
  {
    "lane": 2,
    "targetTime": 157.01
  },
  {
    "lane": 2,
    "targetTime": 157.27
  },
  {
    "lane": 2,
    "targetTime": 157.78
  },
  {
    "lane": 2,
    "targetTime": 158.13
  },
  {
    "lane": 2,
    "targetTime": 158.38
  },
  {
    "lane": 2,
    "targetTime": 159.01
  },
  {
    "lane": 0,
    "targetTime": 159.01
  },
  {
    "lane": 2,
    "targetTime": 159.5
  },
  {
    "lane": 0,
    "targetTime": 159.5
  },
  {
    "lane": 2,
    "targetTime": 159.75
  },
  {
    "lane": 2,
    "targetTime": 160.01
  },
  {
    "lane": 0,
    "targetTime": 160.01
  },
  {
    "lane": 2,
    "targetTime": 160.38
  },
  {
    "lane": 2,
    "targetTime": 160.75
  },
  {
    "lane": 2,
    "targetTime": 161.01
  },
  {
    "lane": 0,
    "targetTime": 161.01
  },
  {
    "lane": 2,
    "targetTime": 161.26
  },
  {
    "lane": 2,
    "targetTime": 161.75
  },
  {
    "lane": 2,
    "targetTime": 162.01
  },
  {
    "lane": 0,
    "targetTime": 162.01
  },
  {
    "lane": 2,
    "targetTime": 162.26
  },
  {
    "lane": 2,
    "targetTime": 162.75
  },
  {
    "lane": 2,
    "targetTime": 163.0
  },
  {
    "lane": 2,
    "targetTime": 163.26
  },
  {
    "lane": 2,
    "targetTime": 163.75
  },
  {
    "lane": 2,
    "targetTime": 164.0
  },
  {
    "lane": 2,
    "targetTime": 164.37
  },
  {
    "lane": 2,
    "targetTime": 164.75
  },
  {
    "lane": 2,
    "targetTime": 165.12
  },
  {
    "lane": 2,
    "targetTime": 165.37
  },
  {
    "lane": 0,
    "targetTime": 165.37
  },
  {
    "lane": 2,
    "targetTime": 166.0
  },
  {
    "lane": 0,
    "targetTime": 166.0
  },
  {
    "lane": 2,
    "targetTime": 166.37
  },
  {
    "lane": 2,
    "targetTime": 166.63
  },
  {
    "lane": 2,
    "targetTime": 167.0
  },
  {
    "lane": 0,
    "targetTime": 167.0
  },
  {
    "lane": 2,
    "targetTime": 167.25
  },
  {
    "lane": 2,
    "targetTime": 167.74
  },
  {
    "lane": 2,
    "targetTime": 168.0
  },
  {
    "lane": 0,
    "targetTime": 168.0
  },
  {
    "lane": 2,
    "targetTime": 168.34
  },
  {
    "lane": 2,
    "targetTime": 168.74
  },
  {
    "lane": 2,
    "targetTime": 168.99
  },
  {
    "lane": 0,
    "targetTime": 168.99
  },
  {
    "lane": 2,
    "targetTime": 169.37
  },
  {
    "lane": 3,
    "targetTime": 169.62
  },
  {
    "lane": 2,
    "targetTime": 169.88
  },
  {
    "lane": 2,
    "targetTime": 170.25
  },
  {
    "lane": 2,
    "targetTime": 170.62
  },
  {
    "lane": 0,
    "targetTime": 170.62
  },
  {
    "lane": 2,
    "targetTime": 170.99
  },
  {
    "lane": 0,
    "targetTime": 170.99
  },
  {
    "lane": 2,
    "targetTime": 171.48
  },
  {
    "lane": 2,
    "targetTime": 171.73
  },
  {
    "lane": 2,
    "targetTime": 171.99
  },
  {
    "lane": 2,
    "targetTime": 172.25
  },
  {
    "lane": 2,
    "targetTime": 172.62
  },
  {
    "lane": 0,
    "targetTime": 172.62
  },
  {
    "lane": 2,
    "targetTime": 172.99
  },
  {
    "lane": 0,
    "targetTime": 172.99
  },
  {
    "lane": 2,
    "targetTime": 173.24
  },
  {
    "lane": 2,
    "targetTime": 173.73
  },
  {
    "lane": 0,
    "targetTime": 173.73
  },
  {
    "lane": 2,
    "targetTime": 174.22
  },
  {
    "lane": 0,
    "targetTime": 174.22
  },
  {
    "lane": 2,
    "targetTime": 177.8
  }
];
